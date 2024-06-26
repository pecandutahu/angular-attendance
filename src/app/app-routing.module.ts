import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListsComponent } from './components/employee/employee-lists/employee-lists.component';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { PresencetypeListsComponent } from './components/presence-type/presencetype-lists/presencetype-lists.component';
import { PresenceListsComponent } from './components/presence/presence-lists/presence-lists.component';

const routes: Routes = [
  { path: 'employees', component:EmployeeListsComponent },
  { path: 'employees/create', component:EmployeeFormComponent },
  { path: 'employees/:id', component:EmployeeViewComponent },
  { path: 'presence-types', component:PresencetypeListsComponent },
  { path: '', component:PresenceListsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
