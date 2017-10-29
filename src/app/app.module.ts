import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications-lite';
import { SharedModule } from './shared/shared.module';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { UserService } from './shared/services/user.service';
import { ApiService } from './shared/services/api.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';
import { HomeService } from './shared/services/home.service';
import { JwtService } from './shared/services/jwt.service';
import { RouteService } from './shared/services/route.service';

import { AppRoutingModule } from './app-routing.module';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule, 
    ConfirmDialogModule,
    LoadersCssModule,
    MomentModule,
    SimpleNotificationsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    UserService,
    ApiService,
    AuthGuardService,
    NoAuthGuardService,
    HomeService,
    JwtService,
    ConfirmationService,
    RouteService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule { }
