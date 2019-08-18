import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'caronsale-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.styl']
})
export class MenuBarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openLoginDialog() {
    // open login dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe(val => console.log('Dialog output:', val));
  }
}
