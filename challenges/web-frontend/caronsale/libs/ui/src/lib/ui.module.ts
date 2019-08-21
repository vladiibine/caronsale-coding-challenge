import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material';
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
import { ImgFallbackModule } from 'ngx-img-fallback';
import { AuctionCardComponent } from './auction-card/auction-card.component';
import { BuyerOverviewComponent } from './buyer-overview/buyer-overview.component';
import { DealershipOverviewComponent } from './dealership-overview/dealership-overview.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
@NgModule({
  imports: [
    ImgFallbackModule,
    MatGridListModule,
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
    MatDatepickerModule,
    FlexLayoutModule
  ],
  declarations: [
    MenuBarComponent,
    LoginDialogComponent,
    AuctionCardComponent,
    BuyerOverviewComponent,
    DealershipOverviewComponent
  ],
  exports: [
    MenuBarComponent,
    LoginDialogComponent,
    AuctionCardComponent,
    BuyerOverviewComponent,
    DealershipOverviewComponent
  ],
  entryComponents: [LoginDialogComponent]
})
export class UiModule {}
