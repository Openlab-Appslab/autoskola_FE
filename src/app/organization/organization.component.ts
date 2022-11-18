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
  logoFormData: FormData;
  logo: any;
  constructor(private organizationService: OrganizationService) {
    this.organization = new Organization();
    this.logoFormData = new FormData();
  }

  ngOnInit(): void {
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

}
