import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, SignupComponent, ResetpasswordComponent, AllUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent },
      { path: 'reset-password/:resetPasswordToken', component: ResetpasswordComponent },
      { path: 'all-users', component: AllUsersComponent }
    ])
  ]
})
export class UserModule { }
