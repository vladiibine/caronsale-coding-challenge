import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MenuBarComponent, LoginDialogComponent],
  exports: [MenuBarComponent, LoginDialogComponent]
})
export class UiModule {}
