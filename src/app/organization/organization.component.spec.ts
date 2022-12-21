import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganizationComponent } from './organization.component';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';


describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to getAuthority on init and set user authority to variable', () => {
    const authService = TestBed.inject(AuthService);
    const spy = spyOn(authService, 'getAuthority').and.returnValue(of({authority: 'ADMIN'}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.user.authority).toEqual('ADMIN');
  });
});
