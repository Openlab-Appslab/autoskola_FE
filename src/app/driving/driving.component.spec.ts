import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrivingService } from '../services/driving.service';
import { DrivingComponent } from './driving.component';

describe('DrivingComponent', () => {
  let component: DrivingComponent;
  let fixture: ComponentFixture<DrivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DrivingComponent ],
      providers: [DrivingService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a date', () => {
    component.selectedDate = new Date();
    expect(component.selectedDate).toBeTruthy();
  });

  it('should filter free times when a date is selected', () => {
    component.selectedDate = new Date();
    component.freeTimesFilter();
    expect(component.freeTimes).toBeTruthy();
  });

  it('should remove a row', () => {
    component.removeRow(0);
    expect(component.removeRow).toBeTruthy();
  });

  it('should get current organization id and userRole when ngOnInit is called and write them to variables', () => {
    component.ngOnInit();
    expect(component.currentOrganization).toBeUndefined();
    expect(component.userRole).toBeUndefined();
  });
});