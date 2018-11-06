import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs";
import {AppCacheService} from "@eo-sdk/core";

export interface Client {
  // client number
  clientNo: string;
  // ID of the context folder
  contextFolderId: string;
  // Title of the context folder
  contextFolderTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private STORAGE_KEY = 'app.client';
  private client: Client;
  private clientSource = new ReplaySubject<Client>(1);
  public client$: Observable<Client> = this.clientSource.asObservable();

  constructor(private storage: AppCacheService) {
    this.storage.getItem(this.STORAGE_KEY).subscribe(client => {
      this.client = client;
      this.clientSource.next(this.client);
    })
  }
}
