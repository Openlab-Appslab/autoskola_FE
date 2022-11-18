import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: Organization[];
  waitingRoom: any;
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizationService.allORG().subscribe(data => {
      if (data.length > 0) {
        this.organizations = data;
      }
    });
    this.organizationService.getWaitingRoom().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.waitingRoom = data;
        }
      }
    );
  }
  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }

  addToWaitingRoom(organization: Organization) {
    this.organizationService.saveToWaitingRoom(organization).subscribe(data => {
      window.location.reload();
    });
  }

  cancelWaitingRoom(){}
}
