import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrivingService {

  constructor(private http: HttpClient) { }

  private saveDrivingDateUrl = 'http://localhost:8080/newReservation';
  private reserveDayTimeUrl = 'http://localhost:8080/reserveDayTime';
  private reservationForInstrucorUrl = 'http://localhost:8080/reservationForInstructor';

  reserveDrivingDate(drivingDate: any, id_organization: number) {
    return this.http.post(this.saveDrivingDateUrl, {"reservationDate": drivingDate, "autoskolaOrganization": {"id_organization": id_organization}});
  }

  reserveDayTime(drivingDate: any, time: any, id: any) {
    return this.http.post(this.reserveDayTimeUrl, {"time": time, "reservationDay": {"id": id, "reservationDate": drivingDate} });
  }

  reservationForInstructor() {
    return this.http.get(this.reservationForInstrucorUrl);
  }
}
