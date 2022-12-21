import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [OrganizationService]
  }));

  it('should be created', () => {
    const service: OrganizationService = TestBed.get(OrganizationService);
    expect(service).toBeTruthy();
   });
});
