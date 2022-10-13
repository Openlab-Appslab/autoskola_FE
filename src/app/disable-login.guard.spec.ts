import { TestBed } from '@angular/core/testing';

import { DisableLoginGuard } from './disable-login.guard';

describe('DisableLoginGuard', () => {
  let guard: DisableLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisableLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
