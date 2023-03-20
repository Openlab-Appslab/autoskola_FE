import { Component, OnInit } from '@angular/core';
import { DrivingService } from '../services/driving.service';
import { AuthService } from '../services/auth.service';

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
  constructor(private drivingService: DrivingService, private authService: AuthService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  ngOnInit() {
    this.authService.getAuthority().subscribe((data: any) => {
      if (data.authority === 'ADMIN') {
        this.userRole = 'ADMIN';
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
    this.drivingService.reserveDrivingDate(date).subscribe(data => {
      this.freeTimes = data;
    });
  }
}
