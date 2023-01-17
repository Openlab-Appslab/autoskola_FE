import { waitingRoom } from './../waitingRoom';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  private saveORGUrl = 'http://localhost:8080/api/createOrganization';
  private postImageUrl = 'http://localhost:8080/upload/image';
  private saveToWaitingRoomUrl = 'http://localhost:8080/saveToWaitingRoom';
  private alORGUrl = 'http://localhost:8080/api/allOrganization';
  private getWaitingRoomUrl = 'http://localhost:8080/returnAllWaitingRoom';
  private getImageUrl = 'http://localhost:8080/get/image/info/';
  private removeFromWaitingRoomUrl = 'http://localhost:8080/removeFromWaitingRoom';
  private getAllStudentsInWaitingRoomUrl = 'http://localhost:8080/returnAllStudentsInWaitingRoom';
  private getAllStudentsInOrganizationUrl = 'http://localhost:8080/returnAllStudentsInOrganization';
  private addStudentsToOrganizationUrl = 'http://localhost:8080/addMembersToOrganization';
  private getCurrentOrganizationIdUrl = 'http://localhost:8080/returnCurrentOrganization';

  saveORG(organization: Organization) {
    return this.http.post<Organization>(this.saveORGUrl, organization);
  }

  postImage(logo: any) {
    return this.http.post<Organization>(this.postImageUrl, logo);
  }

  saveToWaitingRoom(organization: Organization) {
    return this.http.post<Organization>(this.saveToWaitingRoomUrl, {"autoskolaOrganization": {"id_organization": organization.id_organization}});
  }

  allORG() {
    return this.http.get<Organization[]>(this.alORGUrl);
  }

  getWaitingRoom() {
    return this.http.get<Organization[]>(this.getWaitingRoomUrl);
  }

  getImage(id: number) {
    return this.http.get(this.getImageUrl + id);
  }

  cancelWaitingRoom(id: number) {
    return this.http.post(this.removeFromWaitingRoomUrl, {"id_waiting": id});
  }

  getAllStudentsInWaitingRoom(): Observable<waitingRoom[]> {
    return this.http.get<waitingRoom[]>(this.getAllStudentsInWaitingRoomUrl);
  }

  getAllStudentsInOrganization(): Observable<any[]> {
    return this.http.get<any[]>(this.getAllStudentsInOrganizationUrl);
  }

  addStudentsToOrganization(userId: number, organizationId: number) {
    return this.http.post(this.addStudentsToOrganizationUrl, {"autoskolaOrganization": {"id_organization": organizationId}, "userEntity": {"id": userId}});
  }

  getCurrentOrganizationId(): Observable<any> {
    return this.http.get<any>(this.getCurrentOrganizationIdUrl);
  }
}
