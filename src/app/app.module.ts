import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListsComponent } from './components/employee/employee-lists/employee-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeViewComponent } from './components/employee/employee-view/employee-view.component';
import { FormsModule } from '@angular/forms';
import { EmployeeModalComponent } from './components/employee/modal/employee-modal/employee-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PresencetypeListsComponent } from './components/presence-type/presencetype-lists/presencetype-lists.component';
import { ModalpresencetypeComponent } from './components/presence-type/modal/modalpresencetype/modalpresencetype.component';
import { PresenceListsComponent } from './components/presence/presence-lists/presence-lists.component';
import { PresenceModalComponent } from './components/presence/presence-modal/presence-modal.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListsComponent,
    EmployeeViewComponent,
    EmployeeModalComponent,
    PresencetypeListsComponent,
    ModalpresencetypeComponent,
    PresenceListsComponent,
    PresenceModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    GoogleMapsModule,
    WebcamModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
