import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authSrv: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSrv.user$.pipe(
      take(1),
      map((user) => {
        if(user) {
          return true
        }
        alert(
          'You must be logged!'
        )
        return this.router.createUrlTree(['/login'])
      })
    )
  }
  
}
