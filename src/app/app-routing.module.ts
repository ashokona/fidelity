import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'', 
    canActivate:[NoAuthGuardService],
    component:LoginComponent
  },
  { 
    path:'home', 
    canActivate:[AuthGuardService], 
    loadChildren:'./home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
