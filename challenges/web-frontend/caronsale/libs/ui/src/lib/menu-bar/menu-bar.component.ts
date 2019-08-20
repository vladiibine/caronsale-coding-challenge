import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  AuthenticationFacade,
  LoginData
} from '@caronsale/authentication';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'caronsale-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.styl']
})
export class MenuBarComponent implements OnInit {
  @Input() navTarget!: Record<string, string>;

  authenticated$: Observable<boolean> = this.authenticationFacade
    .isAuthenticated$;

  constructor(
    private dialog: MatDialog,
    private authenticationFacade: AuthenticationFacade
  ) {}

  ngOnInit() {}

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(filter((e: LoginData) => !!e && !!e.email && !!e.password))
      .subscribe(val => {
        this.authenticationFacade.sendAuthentication(val, this.navTarget);
      });
  }

  logOut() {
    this.authenticationFacade.logOut();
  }
}
