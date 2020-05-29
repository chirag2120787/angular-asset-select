import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetSelectComponent } from './asset-select/asset-select.component';


// const routes: Routes = [{ path: '', pathMatch: 'full', component: , canActivate: [] },];
const routes: Routes = [
  { path: '', pathMatch: 'full', component: AssetSelectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }