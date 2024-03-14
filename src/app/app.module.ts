import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileService } from './auth/service/profile.service';
import { AuthService } from './auth/service/auth.service';


const routes: Route[] = [
  {
    path: 'users/:profileId',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard, ProfileService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
