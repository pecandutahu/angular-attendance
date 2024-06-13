import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee';
import { environtment } from '../../../environtment/environtment';
import { Observable } from 'rxjs';
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
    return this.http.post(`${environtment.apiURl}/employee`, employee);
  }

  updateEmployee(employee:Employee): Observable<Employee> {
    return this.http.put(`${environtment.apiURl}/employee/${employee.employeeId}`, employee);
  }

  deleteEmployee(id: number | undefined): Observable<any> {
    return this.http.delete(`${environtment.apiURl}/employee/${id}`, {responseType: 'text'});
  }
}
