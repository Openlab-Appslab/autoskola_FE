import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organization: Organization;
  logoFormData: FormData;
  logo: any;
  user: User = {} as User;
  waitingRoom: any[] = [];
  usersInOrganization: any[] = [];
  organizationId: any;
  constructor(private organizationService: OrganizationService, private authService: AuthService) {
    this.organization = new Organization();
    this.logoFormData = new FormData();
  }

  ngOnInit(): void {
    this.authService.getAuthority().subscribe(
      (data: any) => {
        this.user.authority = data.authority;
      }
    );
    this.organizationService.getAllStudentsInWaitingRoom().subscribe(
      (data: any) => {
        this.waitingRoom = data;
      }
    );
    this.organizationService.getAllStudentsInOrganization().subscribe(
      (data: any) => {
        this.usersInOrganization = data;
        for (let i = 0; i < this.usersInOrganization.length; i++) {
          for (let j = 0; j < this.waitingRoom.length; j++) {
            if (this.usersInOrganization[i].id === this.waitingRoom[j].id) {
              this.waitingRoom.splice(j, 1);
            }
          }
        }
      }
    );
    this.organizationService.getCurrentOrganizationId().subscribe(
      (data: any) => {
        this.organizationId = data;
      }
    );
  }

    
  sendORG() {
    this.organizationService.postImage(this.logoFormData).subscribe(
      () => {
        this.organizationService.saveORG(this.organization).subscribe();
      }
    );
  }

  onFileChange(event: any) {
    this.logoFormData.append('image', event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  acceptUser(id: number) {
    this.organizationService.addStudentsToOrganization(id, this.organizationId.id_organization).subscribe(
      () => {
        // remove from waiting room
        for (let i = 0; i < this.waitingRoom.length; i++) {
          if (this.waitingRoom[i].id === id) {
            this.usersInOrganization.push(this.waitingRoom[i]);
            this.waitingRoom.splice(i, 1);
          }
        }
      }
    );
  }
}
