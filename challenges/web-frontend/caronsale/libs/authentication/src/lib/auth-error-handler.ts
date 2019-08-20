import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationFacade } from './+state/authentication.facade';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private authenticationFacade: AuthenticationFacade
  ) {}

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error.rejection.status === 401 || error.rejection.status === 403) {
      this.authenticationFacade.logOut();
      router.navigate(['/']);
    }

    throw error;
  }
}
