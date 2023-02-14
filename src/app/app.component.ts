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
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (!window.location.href.includes('login') && this.authority === undefined && !window.location.href.includes('registration')) {
    this.authService.getAuthority().subscribe(
      (data: any) => {
        this.authority = data.authority;
      }
    );
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

}
