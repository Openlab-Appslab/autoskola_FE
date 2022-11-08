import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  private saveORGUrl = 'http://localhost:8080/api/createOrganization';

  saveORG(organization: Organization) {
    return this.http.post<Organization>(this.saveORGUrl, organization);
  }
}
