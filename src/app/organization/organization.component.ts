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
  organizationId: any;
  constructor(private organizationService: OrganizationService, private authService: AuthService) {
    this.organization = new Organization();
    this.logoFormData = new FormData();
  }

  ngOnInit(): void {
      forkJoin([
        this.organizationService.getCurrentOrganizationId(),
        this.authService.getAuthority(),
        this.organizationService.getAllStudentsInWaitingRoom(),
      ]).subscribe(
        ([organi, authority, waitingRoom]) => {
          if (organi === null){
            this.organizationId = null;
          }
          else
          {
            this.organizationId = organi.id_organization;
          }
          this.user.authority = authority;
          this.waitingRoom = waitingRoom;
          this.organizationService.getAllStudentsInOrganization().subscribe(
            (users) => {
              this.usersInOrganization = users;
              if (this.usersInOrganization !== null){
                for (let i = 0; i < this.usersInOrganization.length; i++) {
                  for (let j = 0; j < this.waitingRoom.length; j++) {
                    if (this.usersInOrganization[i].id === this.waitingRoom[j].id) {
                      this.waitingRoom.splice(j, 1);
                    }
                  }
                }
              }
            }
          );
        }
      );
  }
    
  sendORG() {
    this.organizationService.postImage(this.logoFormData).pipe(
      exhaustMap(() => this.organizationService.saveORG(this.organization))
    ).subscribe( () => {
      alert('Organization created successfully!');
      window.location.reload();
    });
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


    minusTheory(username: string) {
      this.organizationService.degreaseTheoryHours(username).subscribe( (data: any) => {
        console.log(data);
        for (let i = 0; i < this.usersInOrganization.length; i++) {
          if (this.usersInOrganization[i].username === username) {
            this.usersInOrganization[i].countOfTheory -= 2;
          }
        }
    });
    }

    minusPractise(username: string) {
      this.organizationService.degreasePracticeHours(username).subscribe( (data: any) => {
        console.log(data);
        for (let i = 0; i < this.usersInOrganization.length; i++) {
          if (this.usersInOrganization[i].username === username) {
            this.usersInOrganization[i].countOfDriving -= 1;
          }
        }
    });
    }
    
}
