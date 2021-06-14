import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Fridge } from '../objects/fridge';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/internal/operators';
import { Item } from '../objects/item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Basic' + btoa('tridungngo:dung1998')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseUrl = 'https://innovations.rola.com/build/rola/coolschrank/ongoing/application';

  constructor(private httpClient: HttpClient) { }

  //POST Method
  generateFridgeService(): Observable<any> {
    const postUrl = `${this.baseUrl}/fridge/`;

    return this.httpClient.post<Fridge>(postUrl, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //GET Method: get fridge and all its items
  getFridgeService(id: string): Observable<any> {
    const getUrl = `${this.baseUrl}/fridge/${id}`;
    
    return this.httpClient.get<any>(getUrl, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //POST Method: create new item to desired fridge
  addSingleItemService(id: string, item: Item ): Observable<any> {
    const postUrl = `${this.baseUrl}/fridge/${id}/item`;

    return this.httpClient.post<Item>(postUrl, item, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //GET Method: get one item based on fridgeId and itemId
  getSingleItemService(id: string, itemId: number): Observable<any> {
    const getUrl = `${this.baseUrl}/fridge/${id}/item/${itemId}`;
    
    return this.httpClient.get<Item>(getUrl, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //POST Method: change one item based on fridgeId and itemId
  changeSingleItemService(id: string, itemId: number, item: any): Observable<any> {
    const postUrl = `${this.baseUrl}/fridge/${id}/item/${itemId}`;
    
    return this.httpClient.post<Item>(postUrl, item, httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      `Error code: ${error.status}; please try again.`);
  }
}
