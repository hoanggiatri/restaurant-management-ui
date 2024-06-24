import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const redirectToHomeGuard: CanActivateFn = (route, state) => {
  const matSnackbar = inject(MatSnackBar);

  if (inject(AuthService).isLoggedIn()) {
    inject(Router).navigate(['/']);
    matSnackbar.open('You logged in!', 'Ok', {
      duration: 3000,
    });
  }
  return true;
};
