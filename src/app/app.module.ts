import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInterceptor } from './error-handler/my-interceptor';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { NotFoundComponent } from './error-handler/not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    MeetingModule,
    HttpClientModule,
    ErrorHandlerModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ])

  ],
  providers: [AppService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
