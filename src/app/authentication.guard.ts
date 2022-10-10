import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate  {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate() {
      if (this.authService.isLoggedIn() == null) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}