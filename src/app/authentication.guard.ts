import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate  {
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      let token = sessionStorage.getItem('token');

      if (token && state.url == "/login") {
        return this.router.parseUrl('/');
      }

      if (state.url == "/login") {
        return true;
      }

      if (!token) {
        return this.router.parseUrl('/login');
      }

      return true;
  }
}