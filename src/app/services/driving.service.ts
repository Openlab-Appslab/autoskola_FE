import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrivingService {

  constructor(private http: HttpClient) { }

  private saveDrivingDateUrl = 'http://localhost:8080/newReservation';
  private reserveDayTimeUrl = 'http://localhost:8080/reserveDayTime';
  private reservationForInstrucorUrl = 'http://localhost:8080/requestForInstructor';
  private reservationAccptedUrl = 'http://localhost:8080/reservationAccepted';
  private acceptedForInstructorUrl = 'http://localhost:8080/acceptedForInstructor';

  reserveDrivingDate(drivingDate: any, id_organization: number) {
    return this.http.post(this.saveDrivingDateUrl, {"reservationDate": drivingDate, "autoskolaOrganization": {"id_organization": id_organization}});
  }

  reserveDayTime(drivingDate: any, time: any, id: any) {
    return this.http.post(this.reserveDayTimeUrl, {"time": time, "reservationDay": {"id": id, "reservationDate": drivingDate} });
  }

  reservationForInstructor() {
    return this.http.get(this.reservationForInstrucorUrl);
  }

  reservationAccpted(request: any) {
    return this.http.post(this.reservationAccptedUrl, request);
  }

  acceptedForInstructor() {
    return this.http.get(this.acceptedForInstructorUrl);
  }
}