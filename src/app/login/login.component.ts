import { User } from './../user';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  token: String;
  constructor(public router: Router, private authService: AuthService) {
    this.user = new User();
    // find token in URL and save it to token variable
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
  }

  ngOnInit(): void {
    if (this.token !== undefined) {
      this.authService.sendConfirmationToken(this.token).subscribe();
    }
  }

  login() {
    this.authService.login(this.user).subscribe((response: any) => {
      sessionStorage.setItem('token', response.sessionId);
      this.authService.getAuthority().subscribe(
        (data: any) => {
          AppComponent.prototype.authority = data.authority;
        }
      );
        window.location.href = '/home';
    });
    }
}