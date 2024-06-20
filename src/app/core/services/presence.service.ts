import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment } from '../../../environtment/environtment';
import { Observable, catchError, throwError } from 'rxjs';
import { Presence } from '../models/presence';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor( private http:HttpClient) { }

  getPresences(): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${environtment.apiURl}/presence`);
  }

  checkin(presence: Presence): Observable<Presence> {
    const formData = new FormData();
    formData.append('employeeId', presence.employeeId?.toString() || '');
    formData.append('presenceTypeId', presence.presenceTypeId?.toString() || '');
    formData.append('coordinates', presence.checkInCoordinates || '');
    presence.checkInImages?.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    return this.http.post<Presence>(`${environtment.apiURl}/presence/checkin`, formData).pipe(
      catchError(this.handleError)
    );
  }

  checkout(presence: Presence): Observable<Presence> {
    const formData = new FormData();
    formData.append('employeeId', presence.employeeId?.toString() || '');
    formData.append('presenceTypeId', presence.presenceTypeId?.toString() || '');
    formData.append('coordinates', presence.checkOutCoordinates || '');
    presence.checkOutImages?.forEach((file, index) => {
      formData.append('images', file, file.name);
    });

    return this.http.post<Presence>(`${environtment.apiURl}/presence/checkout`, formData).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError(error);
  }

}
