import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private instructorRegisterUrl = 'http://localhost:8080/api/instructorRegister';
  private studentRegisterUrl = 'http://localhost:8080/api/studentRegister';
  private adminRegisterUrl = 'http://localhost:8080/api/adminRegister';
  private loginUrl = 'http://localhost:8080/api/login';
  private getAuthorityUrl = 'http://localhost:8080/api/returnAuthority';

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
