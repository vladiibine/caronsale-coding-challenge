import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthenticationFacade,
  AuthenticationState
} from '@caronsale/authentication';
import * as fromConsts from '@caronsale/authentication';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

export const salesmanAuctionsUrl = fromConsts.baseURL + '/auction/salesman';
export const dealershipAuctionsUrl =
  fromConsts.baseURL + '/auction/dealership/';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {
  constructor(
    private http: HttpClient,
    private authenticationFacade: AuthenticationFacade
  ) {}
  getSalesmanAuction(): Observable<any> {
    return this.authenticationFacade.authenticationState$.pipe(
      take(1),
      switchMap((authentication: AuthenticationState) => {
        return this.http
          .get<any>(salesmanAuctionsUrl + '/' + authentication.userId + '/_all')
          .pipe(
            shareReplay(),
            tap(console.log)
            // catchError(() => throwError('No auctions were found'))
          );
      })
    );
  }
}
