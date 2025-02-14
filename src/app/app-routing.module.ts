import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './defaultScreens/page-not-found/page-not-found.component';
import { SigninComponent } from './login/signin/signin.component';

const routes: Routes = [
  { path: 'userPanel', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'userpanel', redirectTo: '/userPanel', pathMatch: 'full' },

  { path: 'page-not-found', component: PageNotFoundComponent },
  // { path: '', redirectTo:'page-not-found' },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
