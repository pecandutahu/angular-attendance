import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../../../core/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css'
})
export class EmployeeModalComponent implements OnInit{

  @Input() employee: { employeeId: any, nik: string, name: string, unit: string } = { employeeId: null, nik: '', name: '', unit: '' };
  @Output() refreshData = new EventEmitter<void>();
  errors: { [key: string]: string } = {}; // Object to store errors

  constructor(public activeModal: NgbActiveModal, private employeeService: EmployeeService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.employee.employeeId === null) {
      this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.refreshData.emit(); // Memanggil kembali loadEmployees()
        this.activeModal.close();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.refreshData.emit(); // Memanggil kembali loadEmployees()
        this.activeModal.close();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    }
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error && error.error.errors) {
      this.errors = {};
      error.error.errors.forEach((err: any) => {
        this.errors[err.path] = err.msg;
      });
    } else {
      this.errors = { general: 'An unexpected error occurred.' };
    }
  }

}
