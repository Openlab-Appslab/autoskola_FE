import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organization: Organization;
  constructor(private organizationService: OrganizationService) {
    this.organization = new Organization();
  }

  ngOnInit(): void { 
  }

  sendORG() {
    this.organizationService.saveORG(this.organization).subscribe();
  }

}
