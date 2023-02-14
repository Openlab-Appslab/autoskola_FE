import { User } from './../user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgForm, FormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent, NgForm ],
      imports: [HttpClientTestingModule, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should send registration data to registerAdmin method in authService if authority is ADMIN', () => {
  //   const authService = TestBed.inject(AuthService);
  //   spyOn(authService, 'registerAdmin').and.returnValue(of({}));
  //   component.user = new User();
  //   component.user.authority = 'ADMIN';
  //   component.onSubmit();
  //   expect(authService.registerAdmin).toHaveBeenCalled();
  // });

  // it('should send registration data to registerInstructor method in authService if authority is INSTRUCTOR', () => {
  //   const authService = TestBed.inject(AuthService);
  //   spyOn(authService, 'registerInstructor').and.returnValue(of({}));
  //   component.user = new User();
  //   component.user.authority = 'INSTRUCTOR';
  //   component.onSubmit();
  //   expect(authService.registerInstructor).toHaveBeenCalled();
  // });

  // it('should send registration data to registerStudent method in authService if authority is STUDENT', () => {
  //   const authService = TestBed.inject(AuthService);
  //   spyOn(authService, 'registerStudent').and.returnValue(of({}));
  //   component.user = new User();
  //   component.user.authority = 'STUDENT';
  //   component.onSubmit();
  //   expect(authService.registerStudent).toHaveBeenCalled();
  // });
});
