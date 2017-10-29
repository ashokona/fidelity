import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';

import { RouteService } from './route.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private routeService : RouteService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.take(1).map(bool => {
      if (bool) {
        this.router.navigate(['/home']);
        // this.routeService.setCurrentRoute('home')
      }
      return !bool;
    });
  }
}