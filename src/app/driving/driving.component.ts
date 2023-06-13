import { Component, OnInit } from '@angular/core';
import { DrivingService } from '../services/driving.service';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-driving',
  templateUrl: './driving.component.html',
  styleUrls: ['./driving.component.css']
})
export class DrivingComponent implements OnInit {
  selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  selectedTime: string;
  freeTimes: any = [];
  userRole: string;
  currentOrganization: any;
  requests: any = [];
  acceptedRequests: any = [];
  constructor(private drivingService: DrivingService, private authService: AuthService, private organizationService: OrganizationService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  ngOnInit() {
    this.organizationService.getCurrentOrganizationId().subscribe((data: any) => {
      this.currentOrganization = data.id_organization;
    });
    this.authService.getAuthority().subscribe((data: any) => {
      if (data.authority === 'ADMIN' || data.authority === 'INSTRUCTOR') {
        this.userRole = 'INSTRUCTOR';
          this.drivingService.reservationForInstructor().subscribe((data: any) => {
            this.requests = data;
          });
          this.drivingService.acceptedForInstructor().subscribe((data: any) => {
            this.acceptedRequests = data;
            console.log(this.acceptedRequests);
          });
      }
      else{
        this.userRole = 'STUDENT';
      }
    });
  }

  selectTime(time: any) {
    const date = new Date(this.selectedDate).toString();
    this.drivingService.reserveDayTime(date, time, this.freeTimes.id).subscribe(data => {
      if (data === null) {
        alert('Time was successfully reserved');
        window.location.reload();
      }
      else {
        alert('Error');
      }
    });
  }

  freeTimesFilter() {
    const date = new Date(this.selectedDate).toString();
    this.drivingService.reserveDrivingDate(date, this.currentOrganization).subscribe(data => {
      this.freeTimes = data;
    });
  }

  acceptRow(id: number) {
    if (this.requests.length > id) {
      const acceptedRequest = this.requests[id];
      acceptedRequest.accept = true;
      this.drivingService.reservationAccpted(acceptedRequest).subscribe(data => {
        console.log(data);
      });
      this.acceptedRequests.push(acceptedRequest);
      this.requests.splice(id, 1);
      alert('Request was successfully accepted');
    }
  }
  

  removeRow(id: number) {
    const tr = document.getElementById(id.toString());
    if (tr) {
      this.requests[id].accept = false;
      this.drivingService.reservationAccpted(this.requests[id]).subscribe(data => {
        console.log(data);
      });
      tr.remove();
      alert('Request was successfully rejected');
    }
  }

  doneDriving(planned: any, id: string) {
    this.organizationService.reservationDone(planned.id, planned.userEntity.username).subscribe(data => {
      console.log(data);
    });
    const tr = document.getElementById(id);
    if (tr) {
      if (confirm('Are you sure that the driving is done?')) {
        tr.remove();
      }
    }
  }
}
