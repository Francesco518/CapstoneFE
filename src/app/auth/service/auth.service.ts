import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../interfaces/register-data';
import { AuthData } from '../interfaces/auth-data';
import { LoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable()
  baseUrl = environment.baseUrl
  accessToken!: AuthData;

  constructor(private http: HttpClient, private router: Router) { }

  register(data: RegisterData) {
    return this.http.post(`${this.baseUrl}/auth/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError (this.errors)
      })
    )
  }
  login(data: LoginData) {
    return this.http.post<AuthData>(`${this.baseUrl}/auth/login`, data).pipe(
      tap((dataLogin) => {
        this.authSubj.next(dataLogin)
        this.accessToken = dataLogin
        localStorage.setItem('user', JSON.stringify(dataLogin))
        console.log("Login completed successfully")
        this.router.navigate(['/home'])
      }),
      catchError((err) => {
        console.log(err)
        let errorMessage = 'Errore nella chiamata'
        if (err.error) {
          errorMessage = err.error;
        } else if (err.status === 404) {
          errorMessage = 'Utente non trovato';
        } else if (err.status === 400) {
          errorMessage = 'Formato mail non valido';
        } else if (err.status === 409) {
          errorMessage = 'Email già registrata';
        }
        return throwError(errorMessage)
      })
    )
  }
  logout() {
    this.authSubj.next(null)
    localStorage.removeItem('user')
    const userId = this.getUserId()
    this.router.navigate(['/login'])
  }
  restore() {
    const user = localStorage.getItem('user')
    if (!user) {
      return
    }
    const userData: AuthData = JSON.parse(user)
    if(this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/login'])
      return;
    }
    this.authSubj.next(userData)
    console.log('User exists, restore executed')
  }
  private errors(err: any) {
    console.log(err)
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
    }
  getUserId(): string | null {
    return 'userId'
  }
}
