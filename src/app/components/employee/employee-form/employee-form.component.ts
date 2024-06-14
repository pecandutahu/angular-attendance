import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/employee';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = { employeeId: 0, nik:'', name: '', unit: '' };
  editEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data  => {
      this.employees = data;
    });
  }

  addEmployee(): void {
    this.employeeService.saveEmployee(this.newEmployee).subscribe(data => {
      this.employees.push(data);
      this.newEmployee = { employeeId: 0, nik:'', name: '', unit: ''};
    });
  }

  startEdit(employee: Employee): void {
    this.editEmployee = { ...employee };
  }

  updateEmployee(): void {
    if (this.editEmployee) {
      this.employeeService.updateEmployee(this.editEmployee).subscribe(data => {
        const index = this.employees.findIndex(employee => employee.employeeId === data.employeeId);
        if (index >= 0) {
          this.employees[index] = data;
        }
        this.editEmployee = null;
      });
    }
  }

  deleteEmployee(id: number | undefined): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

}
