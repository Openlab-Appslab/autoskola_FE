import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  checkBadRegister: boolean = false;
  message: Object;
  messageTrue: boolean = false;
  allOrganizations: any;
  selectedOrganization: any;
  constructor(private http: HttpClient, private organizationService: OrganizationService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.organizationService.allORG().subscribe(
      (data: any) => {
        this.allOrganizations = data;
      }
    );
    this.organizationService.organizationForChoose().subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

  onSubmit() {
    if (this.user.authority === 'ADMIN') {
    this.messageTrue = true;
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      (data: any) => {
        if (data.status === 'error')
        alert(data.message);
        else
        alert(data.message);
      },
    );
  }
  else if (this.user.authority === 'INSTRUCTOR')
  {
    this.messageTrue = true;
    this.user.confirmPassword = 'INSTRUCTOR';
    this.user.userEntityInstructors = {
        id_organization: this.selectedOrganization
    }
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      (data: any) => {
        if (data.status === 'error')
        alert(data.message);
        else{
          alert(data.message);
          // route to login
          window.location.href = 'http://localhost:4200/login';
        }
      },
    );
  }
  else if (this.user.authority === 'MAIN_INSTRUCTOR')
  {
    this.messageTrue = true;
    this.user.confirmPassword = 'MAIN_INSTRUCTOR'
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      (data: any) => {
        if (data.status === 'error')
        alert(data.message);
        else{
          alert(data.message);
          // route to login
          window.location.href = 'http://localhost:4200/login';
        }
      },
    );
  }

  else{
    this.messageTrue = true;
    this.user.confirmPassword = 'STUDENT'
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      (data: any) => {
        if (data.status === 'error')
        alert(data.message);
        else{
          alert(data.message);
          // route to login
          window.location.href = 'http://localhost:4200/login';
        }
      },
    );
  }
}
}
