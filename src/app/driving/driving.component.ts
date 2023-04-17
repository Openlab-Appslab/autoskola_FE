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
      if (data.authority === 'ADMIN') {
        this.userRole = 'ADMIN';
          this.drivingService.reservationForInstructor().subscribe((data: any) => {
            this.requests = data;
          });
          this.drivingService.acceptedForInstructor().subscribe((data: any) => {
            this.acceptedRequests = data;
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
    const tr = document.getElementById(id.toString());
    const plannedTable = document.getElementById('plannedTable');
    const reject = document.getElementById('reject' + id.toString());
    const space = document.getElementById('spacing-row');
    if (tr) {
      tr.remove();
      plannedTable!.appendChild(space!);
      plannedTable!.appendChild(tr);
      reject!.remove();
      this.requests[id].accept = true;
      this.drivingService.reservationAccpted(this.requests[id]).subscribe(data => {
        console.log(data);
      });
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

  doneDriving(id: string) {
    const tr = document.getElementById(id);
    if (tr) {
      if (confirm('Are you sure that the driving is done?')) {
        tr.remove();
      }
    }
  }
}
