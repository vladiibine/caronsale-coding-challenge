import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
export const baseURL =
  'https://caronsale-backend-service-dev.herokuapp.com/api/v1';

export enum userPrivileges {
  salesman = '{PUBLIC_USER}~{SALESMAN_USER}',
  buyer = '{PUBLIC_USER}~{BUYER_USER}',
  dealership = '{PUBLIC_USER}~{DEALERSHIP_USER}'
}
