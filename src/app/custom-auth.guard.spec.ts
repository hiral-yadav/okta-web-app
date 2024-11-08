import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customAuthGuard } from './custom-auth.guard';

describe('customAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
