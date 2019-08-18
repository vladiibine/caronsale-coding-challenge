import { Component, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationFacade, LoginData } from '@caronsale/authentication';
import { filter } from 'rxjs/operators';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'caronsale-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.styl']
})
export class MenuBarComponent implements OnInit {
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
        this.authenticationFacade.sendAuthentication(val);
      });
  }
}
