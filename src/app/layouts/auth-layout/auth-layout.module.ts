import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../../../src/app/login/login.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    MatIconModule
    // NgbModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthLayoutModule { }
