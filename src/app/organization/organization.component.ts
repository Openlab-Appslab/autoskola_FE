import { waitingRoom } from './../waitingRoom';
import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../organization';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { exhaustMap, forkJoin } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organization: Organization;
  logoFormData: FormData;
  logo: String;
  user: User = {} as User;
  waitingRoom: waitingRoom[] = [];
  usersInOrganization: any[] = [];
  organizationId: number;
  constructor(private organizationService: OrganizationService, private authService: AuthService) {
    this.organization = new Organization();
    this.logoFormData = new FormData();
  }

  ngOnInit(): void {
      forkJoin([
        this.organizationService.getCurrentOrganizationId(),
        this.authService.getAuthority(),
        this.organizationService.getAllStudentsInWaitingRoom(),
        this.organizationService.getAllStudentsInOrganization()
      ]).subscribe(
        ([organi, authority, waitingRoom, users]) => {
          this.organizationId = organi.id_organization;
          this.user.authority = authority;
          this.waitingRoom = waitingRoom;
          this.usersInOrganization = users;
          for (let i = 0; i < this.usersInOrganization.length; i++) {
            for (let j = 0; j < this.waitingRoom.length; j++) {
              if (this.usersInOrganization[i].id === this.waitingRoom[j].id) {
                this.waitingRoom.splice(j, 1);
              }
            }
          }
        }
      );
  }
    
  sendORG() {
    this.organizationService.postImage(this.logoFormData).pipe(
      exhaustMap(() => this.organizationService.saveORG(this.organization))
    ).subscribe();
    // this.organizationService.postImage(this.logoFormData).subscribe(
    //   () => {
    //     this.organizationService.saveORG(this.organization).subscribe();
    //   }
    // );
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
    this.organizationService.addStudentsToOrganization(id, this.organizationId).subscribe(
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
