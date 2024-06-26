import { Component, OnInit } from '@angular/core';
import { Presence } from '../../../core/models/presence';
import { PresenceService } from '../../../core/services/presence.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresenceModalComponent } from '../presence-modal/presence-modal.component';

@Component({
  selector: 'app-presence-lists',
  templateUrl: './presence-lists.component.html',
  styleUrl: './presence-lists.component.css'
})
export class PresenceListsComponent implements OnInit {
  presences: Presence[] = [];
  filteredData: Presence[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  filterText: string = '';
  
  constructor( private presenceService: PresenceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadPresences();
  }

  loadPresences(): void {
    this.presenceService.getPresences().subscribe((presences: Presence[]) => {
      this.presences = presences;
      this.filteredData = this.presences;
    });
  }


  openCheckinModal(): void {
    const modalRef = this.modalService.open(PresenceModalComponent);
    modalRef.componentInstance.mode = 'checkin';
    modalRef.componentInstance.refreshData.subscribe(() => this.loadPresences());
  }

  openCheckoutModal(presence: Presence): void {
    const modalRef = this.modalService.open(PresenceModalComponent);
    modalRef.componentInstance.mode = 'checkout';
    modalRef.componentInstance.presence = { ...presence };
    modalRef.componentInstance.refreshData.subscribe(() => this.loadPresences());
  }

  openViewModal(presence: Presence): void {
    const modalRef = this.modalService.open(PresenceModalComponent);
    modalRef.componentInstance.mode = 'view';
    modalRef.componentInstance.presence = { ...presence };
  }
  
  filterData(): void {
    this.filteredData = this.presences.filter(data => 
      (data?.Employee?.name?.toLowerCase().includes(this.filterText.toLowerCase()) || '') ||
      (data?.PresenceType?.presenceType?.toLowerCase().includes(this.filterText.toLowerCase()) || '')
    );
  }

  onFilterChange(): void {
    this.filterData();
  }
}
