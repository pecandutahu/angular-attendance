import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css'
})
export class EmployeeModalComponent implements OnInit{

  @Input() employee: { employeeId: number, nik: string, name: string, unit: string } = { employeeId: 0, nik: '', name: '', unit: '' };
  @Output() refreshData = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal, private employeeService: EmployeeService) {}

  ngOnInit(): void {
      console.log(this.employee);
  }

  onSubmit(): void {
    if (this.employee.employeeId === 0) {
      this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.refreshData.emit(); // Memanggil kembali loadEmployees()
        this.activeModal.close();
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.refreshData.emit(); // Memanggil kembali loadEmployees()
        this.activeModal.close();
      });
    }
  }
}
