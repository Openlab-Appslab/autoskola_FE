import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DrivingService } from './driving.service';

describe('DrivingService', () => {
  let service: DrivingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DrivingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
