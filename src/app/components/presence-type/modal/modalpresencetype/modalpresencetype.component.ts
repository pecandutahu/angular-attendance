import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresenceTypeServices } from '../../../../core/services/presence-type-services.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modalpresencetype',
  templateUrl: './modalpresencetype.component.html',
  styleUrl: './modalpresencetype.component.css'
})
export class ModalpresencetypeComponent {

  @Input() presenceType: { presenceTypeId: any, presenceType: string } = { presenceTypeId: null, presenceType: '' };
  @Input() isViewOnly = false;
  @Output() refreshData = new EventEmitter<void>();
  errors: { [key: string]: string } = {}; // Object to store errors

  constructor(public activeModal: NgbActiveModal, private presenceTypeService: PresenceTypeServices) {}

  onSubmit(): void {
    if (this.presenceType.presenceTypeId === null) {
      this.presenceTypeService.savePresenceType(this.presenceType).subscribe(() => {
        this.refreshData.emit();
        this.activeModal.close();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    } else {
      this.presenceTypeService.updatePresenceType(this.presenceType).subscribe(() => {
        this.refreshData.emit();
        this.activeModal.close();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    }
  }

  handleError(error: HttpErrorResponse): void {
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
