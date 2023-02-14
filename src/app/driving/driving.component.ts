import { Component } from '@angular/core';
import { DrivingService } from '../services/driving.service';

@Component({
  selector: 'app-driving',
  templateUrl: './driving.component.html',
  styleUrls: ['./driving.component.css']
})
export class DrivingComponent {
  selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  selectedTime: string;
  freeTimes: any = [];
  constructor(private drivingService: DrivingService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
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
