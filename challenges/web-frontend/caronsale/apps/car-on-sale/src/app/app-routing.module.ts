import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'buyer',
    loadChildren: () => import('@caronsale/buyer').then(mod => mod.BuyerModule)
  },
  {
    path: 'dealership',
    loadChildren: () =>
      import('@caronsale/dealership').then(mod => mod.DealershipModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
