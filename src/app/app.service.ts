import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, throwError} from "rxjs";
import {AppCacheService, SearchService} from "@eo-sdk/core";
import {map} from "rxjs/operators";
import {APP_CONSTANTS} from "./app.constants";
import {switchMap} from "rxjs/internal/operators";

export interface Client {
  clientNo: string;
  contextFolderId: string;
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

  constructor(private storage: AppCacheService, private searchService: SearchService) {
    this.storage.getItem(this.STORAGE_KEY).subscribe(
      client => {
        this.client = client;
        this.clientSource.next(this.client);
      }
    )
  }

  setClient(clientNo: string): Observable<any> {
    let newClient: Client;
    return this.getContextFolder(clientNo).pipe(
      map(context => {
        newClient = {
          clientNo: clientNo,
          contextFolderId: context.id,
          contextFolderTitle: context.title
        };
        this.client = newClient;
        this.clientSource.next(this.client);
        return newClient;
      }),
      switchMap(client => this.storage.setItem(this.STORAGE_KEY, client))
    )
  }

  private getContextFolder(clientNo: string): Observable<{id: string, title: string}>{

    const query = {
      fields: ['id', 'title'],
      filters: {
        'taxmandantcase.taxno': {
          o: 'eq',
          v1: clientNo
        }
      },
      types: [APP_CONSTANTS.contextType]
    };

    return this.searchService.executeQuery(query, false).pipe(
      map(result => {
        const searchResult = this.searchService.createResultFromResponse(result);
        if(!searchResult.hits.length) {
          throwError('not found');
        } else {
          return {
            id: searchResult.hits[0].id,
            title: searchResult.hits[0].title
          }
        }
      })
    )
  }
}
