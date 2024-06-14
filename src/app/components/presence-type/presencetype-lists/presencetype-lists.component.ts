import { Component, OnInit } from '@angular/core';
import { PresenceType } from '../../../core/models/employee/presenceType';
import { PresenceTypeServices } from '../../../core/services/presence-type-services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalpresencetypeComponent } from '../modal/modalpresencetype/modalpresencetype.component';

@Component({
  selector: 'app-presencetype-lists',
  templateUrl: './presencetype-lists.component.html',
  styleUrl: './presencetype-lists.component.css'
})
export class PresencetypeListsComponent implements OnInit {
  presenceTypes : PresenceType[] = [];
  isViewOnly: Boolean = false;

  constructor( private presenceTypeService: PresenceTypeServices, private modalService: NgbModal ) { }

  ngOnInit(): void {
      this.loadPresenceTypes();
  }
  
  loadPresenceTypes(): void {
    this.presenceTypeService.getPresenceTypes().subscribe((data: PresenceType[]) => {
      this.presenceTypes = data;
    });
  }

  deletePresenceType(id:number | undefined): void {
    if(confirm("Apakah anda yakin akan menghapus data ini")) {
      this.presenceTypeService.deletePresenceType(id).subscribe(() => {
        this.loadPresenceTypes();
      }, error => {
        console.log(error);
      });
    }
  }

  openModal(presenceType: PresenceType, isViewOnly: Boolean = false): void {
    const modalRef = this.modalService.open(ModalpresencetypeComponent);
    modalRef.componentInstance.presenceType = { ...presenceType };
    modalRef.componentInstance.isViewOnly = isViewOnly;
    modalRef.componentInstance.refreshData.subscribe(() => this.loadPresenceTypes());
  }

  addPresenceType(): void {
    const modalRef = this.modalService.open(ModalpresencetypeComponent);
    modalRef.componentInstance.presenceType = { presenceTypeId: null, presenceType: '' };
    modalRef.componentInstance.refreshData.subscribe(() => this.loadPresenceTypes());
    modalRef.result.then((result) => {
      if(result) {
        console.log(result);
      }
    })
  }

}
