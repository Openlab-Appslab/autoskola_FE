import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private instructorRegisterUrl = 'https://autoskolabe-production.up.railway.app/api/api/instructorRegister';
  private studentRegisterUrl = 'https://autoskolabe-production.up.railway.app/api/api/studentRegister';
  private adminRegisterUrl = 'https://autoskolabe-production.up.railway.app/api/api/adminRegister';
  private loginUrl = 'https://autoskolabe-production.up.railway.app/api/api/login';
  private getAuthorityUrl = 'https://autoskolabe-production.up.railway.app/api/api/returnAuthority';

  registerInstructor(user: User) {
    return this.http.post<User>(this.instructorRegisterUrl, user);
  }

  registerStudent(user: User) {
    return this.http.post<User>(this.studentRegisterUrl, user);
  }

  registerAdmin(user: User) {
    return this.http.post<User>(this.adminRegisterUrl, user);
  }

  login(user: User){
    return this.http.post(this.loginUrl, {username: user.username, password: user.password});
  }

  getAuthority(){
    return this.http.get(this.getAuthorityUrl);
  }
}
