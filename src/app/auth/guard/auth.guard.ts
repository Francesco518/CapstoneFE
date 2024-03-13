import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
