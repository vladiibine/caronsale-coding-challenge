import { HttpHeaders } from '@angular/common/http';
import { AuthenticationResult } from '..';

export const ANONYMOUS_USER: AuthenticationResult = {
  authenticated: false,
  privileges: null,
  token: null,
  type: null,
  userId: null
};
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const baseURL = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1';
export const authenticationUrl = baseURL + '/authentication/';
