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
import { MoviesComponent } from './component/movies/movies.component';
import { SingleFilmComponent } from './component/single-film/single-film.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { MovieGeneratorComponent } from './component/movie-generator/movie-generator.component';
import { QuizzesComponent } from './component/quizzes/quizzes.component';


const routes: Route[] = [
  {
    path: 'users/:profileId',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/:movieId',
    component: SingleFilmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quizzes',
    component: QuizzesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generator',
    component: MovieGeneratorComponent,
    canActivate:[AuthGuard]
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
    redirectTo: ''
  }
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    MoviesComponent,
    SingleFilmComponent,
    HomeComponent,
    MovieGeneratorComponent,
    QuizzesComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [AuthGuard, ProfileService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
