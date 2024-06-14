import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { PresenceType } from '../models/presenceType';
import { environtment } from '../../../environtment/environtment';

@Injectable({
  providedIn: 'root'
})
export class PresenceTypeServices {

  constructor( private router:Router, private http:HttpClient) { }

  getPresenceTypes(): Observable<PresenceType[]> {
    return this.http.get<PresenceType[]>(`${environtment.apiURl}/presence-type`);
  }

  getDetailPresenceType(id: number): Observable<PresenceType> {
    return this.http.get<PresenceType>(`${environtment.apiURl}/presence-type/${id}`);
  }

  savePresenceType(presenceType: PresenceType) {
    return this.http.post(`${environtment.apiURl}/presence-type`, presenceType).pipe(
      catchError(this.handleError)
    );
  }

  updatePresenceType(presenceType:PresenceType): Observable<PresenceType> {
    return this.http.put<PresenceType>(`${environtment.apiURl}/presence-type/${presenceType.presenceTypeId}`, presenceType).pipe(
      catchError(this.handleError)
    )
  }

  deletePresenceType(id: number | undefined): Observable<any> {
    return this.http.delete(`${environtment.apiURl}/presence-type/${id}`, {responseType: 'text'});
  }

  private handleError(error:HttpErrorResponse) {
    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError(error)
  }

}
