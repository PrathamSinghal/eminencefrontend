import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SigninComponent } from '../../login/signin/signin.component';
import { PageNotFoundComponent } from '../../defaultScreens/page-not-found/page-not-found.component';
import { AuthGuard } from '../../customGaurds/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () => import('./admin-settings/admin-settings.module').then((m) => m.AdminSettingsModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },

      { path: 'page-not-found', component: PageNotFoundComponent },

      {
        path: '',
        loadChildren: () => import('./../../login/login.module').then((m) => m.LoginModule)
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: "full"
      },

      // { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
