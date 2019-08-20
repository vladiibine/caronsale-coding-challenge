import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationFacade } from '@caronsale/authentication';

@Component({
  selector: 'caronsale-dealership-overview',
  templateUrl: './dealership-overview.component.html',
  styleUrls: ['./dealership-overview.component.styl']
})
export class DealershipOverviewComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authenticationFacade: AuthenticationFacade
  ) { }

  ngOnInit() {
    this._snackBar.open('We are sorry, this site is closed for dealerships at the moment!', 'Ok', {
      duration: 3000
    });
    this.authenticationFacade.logOut();
  }

}
