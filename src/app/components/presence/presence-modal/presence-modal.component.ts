import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Presence } from '../../../core/models/presence';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresenceService } from '../../../core/services/presence.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrl: './presence-modal.component.css'
})
export class PresenceModalComponent {

  @Input() mode: 'checkin' | 'checkout' = 'checkin';
  @Input() presence: Presence = {};
  @Output() refreshData = new EventEmitter<void>();
  errors: { [key: string]: string } = {};

  constructor(public activeModal: NgbActiveModal, private presenceService: PresenceService) { }

  onSubmit(): void {
    if (this.mode === 'checkin') {
      this.presenceService.checkin(this.presence).subscribe(
        () => {
          this.refreshData.emit();
          this.activeModal.close();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
    } else {
      this.presenceService.checkout(this.presence).subscribe(
        () => {
          this.refreshData.emit();
          this.activeModal.close();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
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

  onFileChange(event: any, type: 'checkIn' | 'checkOut'): void {
    const files = event.target.files;
    if (type === 'checkIn') {
      this.presence.checkInImages = Array.from(files);
    } else {
      this.presence.checkOutImages = Array.from(files);
    }
  }
}
