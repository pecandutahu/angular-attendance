import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../core/models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent implements OnInit {
  employee : Employee | null = null;
  employeeId : number | null = null;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.employeeId) {
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    if(this.employeeId) {
      this.employeeService.getDetailEmployee(this.employeeId).subscribe(employee => {
        this.employee = employee;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

}
