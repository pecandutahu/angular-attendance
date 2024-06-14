import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { environtment } from '../../../environtment/environtment';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private router: Router, private http:HttpClient) { }

  getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environtment.apiURl}/employee`);
  }

  getDetailEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environtment.apiURl}/employee/${id}`);
  }

  saveEmployee(employee:Employee) {
    return this.http.post(`${environtment.apiURl}/employee`, employee).pipe(
      catchError(this.handleError)
    );
  }

  updateEmployee(employee:Employee): Observable<Employee> {
    return this.http.put(`${environtment.apiURl}/employee/${employee.employeeId}`, employee).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number | undefined): Observable<any> {
    return this.http.delete(`${environtment.apiURl}/employee/${id}`, {responseType: 'text'});
  }


  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError(error);
  }
}
