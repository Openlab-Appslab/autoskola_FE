import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.user.authority == 'USER') {
      this.authService.registerUser(this.user).subscribe(
        (data) => {
          console.log(data);
        }
      );
    }
    else {
      this.authService.registerInstructor(this.user).subscribe(
        (data) => {
          console.log(data);
        }
      );
    }
  }

}
