import { HttpHeaders } from '@angular/common/http';
import { AuthenticationResult } from './+state/authentication.models';

export const ANONYMOUS_USER: AuthenticationResult = {
  authenticated: false,
  privileges: '',
  token: '',
  type: null,
  userId: ''
};
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const baseURL = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1';
export const authenticationUrl = baseURL + '/authentication/';

export enum userPrivileges {
  salesman = '{PUBLIC_USER}~{SALESMAN_USER}',
  buyer = '{PUBLIC_USER}~{BUYER_USER}',
  dealership = '{PUBLIC_USER}~{DEALERSHIP_USER}'
}
