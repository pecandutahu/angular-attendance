import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/employee/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModalComponent } from '../modal/employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee-lists',
  templateUrl: './employee-lists.component.html',
  styleUrl: './employee-lists.component.css'
})
export class EmployeeListsComponent implements OnInit {
  employees: Employee[] = [];
  constructor( private employeeService: EmployeeService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees():void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  deleteEmployee(id:number | undefined): void {
    
    if (confirm("Apakah anda yakin akan menghapus data ini? ")) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        setTimeout(() => {
          this.loadEmployees();
        }, 500);
      }, error => {
        console.log(error);
      });
    }
  }


  openModal(employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.employee = { ...employee };
    modalRef.componentInstance.refreshData.subscribe(() => this.loadEmployees());
  }
  
  addEmployee(): void {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.employee = { employeeId: null, nik: '', name: '', unit: '' };
    modalRef.componentInstance.refreshData.subscribe(() => this.loadEmployees());
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

}
