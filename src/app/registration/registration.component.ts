import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  checkBadRegister: boolean = false;
  message: Object;
  messageTrue: boolean = false;
  reSTR: any;
  constructor(private authService: AuthService, private http: HttpClient) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.messageTrue = true;
    this.reSTR = "Potvrď prihlásenie cez Email";
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      (data: any) => {
        if (data.status === 'error')
        alert(data.message);
        else
        alert(data.message);
      },
    );
  }
}
