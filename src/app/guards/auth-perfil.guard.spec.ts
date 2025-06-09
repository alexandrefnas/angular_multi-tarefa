import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPerfilGuard } from './auth-perfil.guard';

describe('authPerfilGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authPerfilGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
