import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,private userService: UserService) { }
  canActivate() {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin))
    }
  }

