import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/employee';
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
  isViewOnly: Boolean = false;
  filteredEmployees: Employee[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filterText: string = '';

  constructor( private employeeService: EmployeeService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees():void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.filterEmployees();
    }, error => {
      console.log('Error fetching data', error)
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


  openModal(employee: Employee, isViewOnly: Boolean = false): void {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.employee = { ...employee };
    modalRef.componentInstance.isViewOnly = isViewOnly;
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

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(employee => 
      (employee?.name?.toLowerCase().includes(this.filterText.toLowerCase()) || '') ||
      (employee?.nik?.toLowerCase().includes(this.filterText.toLowerCase()) || '') ||
      (employee?.unit?.toLowerCase().includes(this.filterText.toLowerCase()) || '')
    );
  }

  onFilterChange(): void {
    this.filterEmployees();
  }

}
