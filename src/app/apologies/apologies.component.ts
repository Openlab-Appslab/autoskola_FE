import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-apologies',
  templateUrl: './apologies.component.html',
  styleUrls: ['./apologies.component.css']
})
export class ApologiesComponent implements OnInit {

  apologyForm = new FormGroup({
    dayOfApology: new FormControl(''),
    messageToInstructor: new FormControl(''),
  });
  authority: String;
  apologies: any[] = [];


  constructor(private authService: AuthService, private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.authService.getAuthority().subscribe((data:any) => {
      this.authority = data.authority;
    });
    this.organizationService.getAllApologies().subscribe((data:any) => {
      this.apologies = data;
      this.apologies.forEach((item) => {
        item.dayOfApology = new Date(item.dayOfApology).toLocaleDateString();
      });
    });
    this.sortApologies();
  }

  sortApologies() {
    this.apologies.sort((a, b) => {
      return <any>new Date(a.dayOfApology) - <any>new Date(b.dayOfApology);
    });
  }

  onSubmit() {
    const dayOfApology = this.apologyForm.value.dayOfApology?.toString() ?? '';
    const messageToInstructor = this.apologyForm.value.messageToInstructor ?? '';
    this.organizationService.sendApologies(dayOfApology, messageToInstructor)
      .pipe(
        tap(() => {
          this.apologyForm.reset();
          alert('Apology sent successfully!');
        })
      )
      .subscribe();
  }
  

  deleteApology(id: number) {
    this.organizationService.deleteApology(id).subscribe();
    this.apologies = this.apologies.filter(item => item.id !== id);
  }

}