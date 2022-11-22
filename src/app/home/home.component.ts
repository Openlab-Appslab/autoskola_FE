import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: any;
  waitingRoom: any;
  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizationService.allORG().subscribe(data => {
      if (data.length > 0) {
        this.organizations = data;
         for (let i = 0; i < this.organizations.length; i++) {
           this.organizationService.getImage(this.organizations[i].image.id).subscribe((data: any) => {
             this.organizations[i].image = 'data:image/jpeg;base64,' + data.image;
           });
         }
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

  cancelWaitingRoom(id: number) {
    this.organizationService.cancelWaitingRoom(id).subscribe(() => {
      window.location.reload();
    });
  }
}