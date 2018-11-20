import {Component, HostListener} from '@angular/core';
import {AuthService, BpmService, DmsService} from "@eo-sdk/core";
import {AppService, Client} from "./app.service";
import {FileSystemFileEntry, UploadEvent} from "ngx-file-drop";
import {of as observableOf, forkJoin as observableForkJoin, Observable} from 'rxjs';
import {APP_CONSTANTS} from "./app.constants";
import {catchError, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated: boolean;
  client: Client;
  state: string;

  // prevent dropping files to anything but the drop area
  @HostListener('dragover', ['$event'])
  public onDragOver(event: Event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: Event) {
    event.preventDefault();
  }

  constructor(private auth: AuthService, private appService:AppService,
              private bpmService: BpmService,
              private dmsService: DmsService){
    this.auth.authenticated$.subscribe(authenticated => this.authenticated = authenticated);
    this.appService.client$.subscribe(client => this.client = client);
  }

  filesDropped(event: UploadEvent) {
    observableForkJoin(event.files.filter(droppedFile => droppedFile.fileEntry.isFile)
      .map(df => this.toObservable(df.fileEntry as FileSystemFileEntry))).subscribe(
      (res: File[]) => this.processFiles(res));
  }

  private toObservable(fileEntry: FileSystemFileEntry): Observable<File> {
    return Observable.create(o => {
      fileEntry.file((file: File) => {
        o.next(file);
        o.complete();
      });
    });
  }

  private processFiles(files: File[]) {

    this.state = 'busy';
    const createFailed: {
      filename: string,
      message: string
    }[] = [];
    const createTasks = [];

    files.forEach(f => {

      createTasks.push(
        this.dmsService.createDmsObject(
          APP_CONSTANTS.documentType, f, {}, {
            id: this.client.contextFolderId,
            type: APP_CONSTANTS.contextType
          }
        ).pipe(
          catchError(e => {
            createFailed.push({
              filename: f.name,
              message: e.error.message
            });
            return observableOf(null);
          }),
          switchMap(createRes => {
            this.bpmService.startProcess(
              APP_CONSTANTS.executableProcessId,
              {},
              [{id: createRes.id, type: APP_CONSTANTS.documentType}]
            ).subscribe();
            return observableOf(createRes);
          })
        )
      );
    });

    observableForkJoin(createTasks).subscribe(
      res => {

        const succeeded = res.filter(r => r !== null);
        if(succeeded.length < res.length){
          this.state = 'error';

          const n = new Notification('taxmax error', {
            body: createFailed.map(cf => `${cf.filename}: ${cf.message}`).join('\n')
          });
        } else {
          this.state = 'done';
          setTimeout(() => {
            this.state = '';
          }, 1500);

        }
      }
    )
  }

  close() {
    window.close();
  }
}
