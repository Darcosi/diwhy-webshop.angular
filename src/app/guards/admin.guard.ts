import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userv: UserService, private router: Router) {}

  isReallyAdmin = "false";

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.isReallyAdmin = JSON.parse(localStorage.getItem("admin") as string);
    // alert(this.isReallyAdmin);
    if (this.isReallyAdmin === "true") {
      return true;
    }
    else {
      this.router.navigateByUrl("home");
      return false;
    }
  }
  
}
