import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environtment } from '../../../environtment/environtment';
import { Observable } from 'rxjs';
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
    formData.append('checkInCoordinates', presence.checkInCoordinates || '');
    presence.checkInImages?.forEach((file, index) => {
      formData.append('checkInImages', file, file.name);
    });

    return this.http.post<Presence>(`${environtment.apiURl}/checkin`, formData);
  }

  checkout(presence: Presence): Observable<Presence> {
    const formData = new FormData();
    formData.append('employeeId', presence.employeeId?.toString() || '');
    formData.append('presenceTypeId', presence.presenceTypeId?.toString() || '');
    formData.append('checkOutCoordinates', presence.checkOutCoordinates || '');
    presence.checkOutImages?.forEach((file, index) => {
      formData.append('checkOutImages', file, file.name);
    });

    return this.http.post<Presence>(`${environtment.apiURl}/checkout`, formData);
  }

}
