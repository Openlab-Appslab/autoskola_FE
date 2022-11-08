import { User } from './../user';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(public router: Router, private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user).subscribe((response: any) => {
      sessionStorage.setItem('token', response.sessionId);
      this.router.navigate(['/home']);
    });
    }
}