import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrganizationService } from '../services/organization.service';
import { ApologiesComponent } from './apologies.component';
import { HttpClientModule } from '@angular/common/http';

describe('ApologiesComponent', () => {
  let component: ApologiesComponent;
  let fixture: ComponentFixture<ApologiesComponent>;
  let organizationServiceSpy: jasmine.SpyObj<OrganizationService>;

  beforeEach(async () => {
    organizationServiceSpy = jasmine.createSpyObj('OrganizationService', ['sendApologies']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ ApologiesComponent ],
      providers: [{ provide: OrganizationService, useValue: organizationServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should send apologies and reset form on submit', () => {
    const dayOfApology = '2020-01-03';
    const messageToInstructor = 'I am sorry for my late arrival.';
    const sendApologiesSpy = organizationServiceSpy.sendApologies.and.returnValue(of({}).pipe(tap(() => {})));
    const resetSpy = spyOn(component.apologyForm, 'reset');
    const alertSpy = spyOn(window, 'alert');
    component.apologyForm.setValue({
      dayOfApology,
      messageToInstructor
    });
    component.onSubmit();
    expect(sendApologiesSpy).toHaveBeenCalledWith(dayOfApology, messageToInstructor);
    expect(resetSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Apology sent successfully!');
  });

});
