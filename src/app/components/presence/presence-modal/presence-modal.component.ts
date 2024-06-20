import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Presence } from '../../../core/models/presence';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PresenceService } from '../../../core/services/presence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../../core/models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { PresenceType } from '../../../core/models/presenceType';
import { PresenceTypeServices } from '../../../core/services/presence-type-services.service';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { environtment } from '../../../../environtment/environtment';

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrl: './presence-modal.component.css'
})
export class PresenceModalComponent implements OnInit{

  @Input() mode: 'checkin' | 'checkout' | 'view' = 'checkin';
  @Input() presence: Presence = {};
  @Input() employees: Employee[] = [];
  @Input() presenceTypes: PresenceType[] = [];
  @Output() refreshData = new EventEmitter<void>();
  errors: { [key: string]: string } = {};
  latitude: number = -6.200000; // Default coordinate (Jakarta)
  longitude: number = 106.816666; // Default coordinate (Jakarta)
  coordinates: any = ""; // Variable for two-way binding
  public webcamImage: WebcamImage | null = null;
  public showWebcam = true;
  private trigger: Subject<void> = new Subject<void>();
  isCameraExist: boolean = true;
  allowCameraSwitch: boolean = true;
  deviceId: string = '';
  currentImage?: WebcamImage;
  checkInCoordinate:any = {};
  checkOutCoordinate:any = {};
  baseUriApi = environtment.apiURl + '/';

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | any;

  constructor(
    public activeModal: NgbActiveModal,
    private presenceService: PresenceService,
    private employeeService: EmployeeService,
    private presenceTypeService: PresenceTypeServices,
  
  ) { }

  ngOnInit(): void {
    if(this.mode !== "view") {
      this.loadEmployees();
      this.loadPresenceTypes();
      this.getCurrentLocation();
    }else{
      this.checkInCoordinate = this.splitCoordinates(this.presence.checkInCoordinates);
      this.checkOutCoordinate = this.splitCoordinates(this.presence.checkOutCoordinates);
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  loadPresenceTypes(): void {
    this.presenceTypeService.getPresenceTypes().subscribe((presenceTypes: PresenceType[]) => {
      this.presenceTypes = presenceTypes;
    });
  }

  onSubmit(): void {
    this.coordinates.replace(/"/g, '');
    if (this.mode === 'checkin') {
      if(!this.presence.checkInCoordinates) {
        this.presence.checkInCoordinates = this.coordinates;
      }
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
      if(!this.presence.checkOutCoordinates) {
        this.presence.checkOutCoordinates = this.coordinates;
      }
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

  splitCoordinates(coordinates: any) {
    const coordinateObject:any = {};
    coordinates = coordinates.replace(/"/g, '');
    console.log( coordinates.split(',').map(String), 'ini')
    if (coordinates) {
      const [lat, lng] = coordinates.split(',').map(Number);
      coordinateObject.latitude = lat;
      coordinateObject.longitude = lng;
    }
    return coordinateObject;
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.coordinates = `${this.latitude},${this.longitude}`;
      if (this.mode === 'checkin') {
        this.presence.checkInCoordinates = this.coordinates;
      } else {
        this.presence.checkOutCoordinates = this.coordinates;
      }
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.coordinates = `${this.latitude},${this.longitude}`;
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
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

  triggerSnapshot(): void {
    this.trigger.next();
  }

  resetPhoto(): void {
    this.webcamImage = null;
    console.log(!this.webcamImage ? "not" : "still yes" )
  }


  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    const file = this.dataURItoFile(webcamImage.imageAsDataUrl, this.mode === 'checkin' ? 'checkInImage.jpg' : 'checkOutImage.jpg');
    if (this.mode === 'checkin') {
      this.presence.checkInImages = [file];
    } else {
      this.presence.checkOutImages = [file];
    }
  }

  dataURItoFile(dataURI: string, fileName: string): File {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: mimeString });
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
