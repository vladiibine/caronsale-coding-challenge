import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuctionCardComponent } from './auction-card/auction-card.component';
import { BuyerOverviewComponent } from './buyer-overview/buyer-overview.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  declarations: [
    MenuBarComponent,
    LoginDialogComponent,
    AuctionCardComponent,
    BuyerOverviewComponent
  ],
  exports: [
    MenuBarComponent,
    LoginDialogComponent,
    AuctionCardComponent,
    BuyerOverviewComponent
  ],
  entryComponents: [LoginDialogComponent]
})
export class UiModule {}
