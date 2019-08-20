import { Component } from '@angular/core';
import * as fromConsts from '@caronsale/authentication';

@Component({
  selector: 'caronsale-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'car-on-sale';
  nav = '/buyer';

  navLinks: Record<string, string> = {
    [fromConsts.userPrivileges.buyer]: '/buyer',
    [fromConsts.userPrivileges.dealership]: '/dealership',
    [fromConsts.userPrivileges.salesman]: '/buyer'
  };
}
