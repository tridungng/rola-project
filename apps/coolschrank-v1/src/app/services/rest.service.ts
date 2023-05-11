import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Fridge } from '../objects/fridge';
import { Observable, throwError } from 'rxjs';

import { Item } from '../objects/item';
import { environment } from '../../environments/environment';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic' + btoa('tridungngo:dung1998'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private httpClient: HttpClient) {}

  generateFridgeService(): Observable<any> {
    const postUrl = `${environment.baseUrl}/fridge/`;

    return this.httpClient
      .post<Fridge>(postUrl, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getFridgeService(id: string): Observable<any> {
    const getUrl = `${environment.baseUrl}/fridge/${id}`;

    return this.httpClient
      .get<any>(getUrl, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  addSingleItemService(id: string, item: Item): Observable<any> {
    const postUrl = `${environment.baseUrl}/fridge/${id}/item`;

    return this.httpClient
      .post<Item>(postUrl, item, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSingleItemService(id: string, itemId: number): Observable<any> {
    const getUrl = `${environment.baseUrl}/fridge/${id}/item/${itemId}`;

    return this.httpClient
      .get<Item>(getUrl, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  changeSingleItemService(
    id: string,
    itemId: number,
    item: any
  ): Observable<any> {
    const postUrl = `${environment.baseUrl}/fridge/${id}/item/${itemId}`;

    return this.httpClient
      .post<Item>(postUrl, item, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(`Error code: ${error.status}; please try again.`);
  }
}
