import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private instructorRegisterUrl = 'http://localhost:8080/api/instructorRegister';
  private userRegisterUrl = 'http://localhost:8080/api/userRegister';

  registerInstructor(user: User) {
    return this.http.post<User>(this.instructorRegisterUrl, user);
  }

  registerUser(user: User) {
    return this.http.post<User>(this.userRegisterUrl, user);
  }

}
