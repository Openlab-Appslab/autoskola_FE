import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autoskola_FE';
  authority: String;
  isLogged: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (!window.location.href.includes('login') && this.authority === undefined && !window.location.href.includes('registration') && sessionStorage.getItem('token') !== null) {
      this.authService.getAuthority().subscribe(
      (data: any) => {
        this.authority = data.authority;
      }
    )};
    // if user is logged in, set isLogged to true else false
    if (sessionStorage.getItem('token') !== null) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
  }


  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }

  canShow() {
    // if url is login or register, return false
    if (window.location.href.includes('login') || window.location.href.includes('registration')) {
      return false;
    }
    return true;
  }

  removeReceiver() {
    sessionStorage.removeItem('receiver');
  }

}
