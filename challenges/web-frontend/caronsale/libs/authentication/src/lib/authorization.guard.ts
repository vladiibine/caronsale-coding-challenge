import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import intersect from 'just-intersect';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationFacade } from './+state/authentication.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private allowedRoles: string[],
    private authenticationFacade: AuthenticationFacade,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return of(false);
    return this.authenticationFacade.authenticationState$.pipe(
      map(user => intersect(this.allowedRoles, [user.privileges]).length > 0),
      take(1),
      tap(allowed => {
        if (!allowed) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
