import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { RouteService } from './route.service';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private routeService : RouteService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    // return this.userService.isAuthenticated.take(1);
    return this.userService.isAuthenticated.take(1).map(bool => {
      if (bool) {
        return bool
      }
      else{
        this.router.navigate(['/']);
        // this.routeService.setCurrentRoute('')
      }
    });
  }
}
