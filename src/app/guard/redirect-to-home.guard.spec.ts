import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectToHomeGuard } from './redirect-to-home.guard';

describe('redirectToHomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectToHomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
