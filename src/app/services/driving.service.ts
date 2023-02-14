import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrivingService {

  constructor(private http: HttpClient) { }

  private saveDrivingDateUrl = 'http://localhost:8080/newReservation';
  private reserveDayTimeUrl = 'http://localhost:8080/reserveDayTime';

  reserveDrivingDate(drivingDate: any) {
    return this.http.post(this.saveDrivingDateUrl, {"reservationDate": drivingDate});
  }

  reserveDayTime(drivingDate: any, time: any, id: any) {
    return this.http.post(this.reserveDayTimeUrl, {"time": time, "reservationDay": {"id": id, "reservationDate": drivingDate} });
  }
}
