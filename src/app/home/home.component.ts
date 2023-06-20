import { Component, OnInit } from '@angular/core';
import { Organization } from '../organization';
import { OrganizationService } from '../services/organization.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: any;
  waitingRoom: any;
  studentInfo: any[] = [];
  isLogged: boolean;
  userRole: string;

  constructor(private organizationService: OrganizationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.organizationService.getInfoForStudent().subscribe(
      (data: any) => {
        this.studentInfo = data;
        //console.log(this.studentInfo);
      });
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
          console.log(this.waitingRoom);
        }
      }
    );
    if (sessionStorage.getItem('token') !== null) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
    this.authService.getAuthority().subscribe(
      (data: any) => {
        this.userRole = data.authority;
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

  goToLogin() {
    window.location.href = '/login';
  }
}