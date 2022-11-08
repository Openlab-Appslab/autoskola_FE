import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autoskola_FE';

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
