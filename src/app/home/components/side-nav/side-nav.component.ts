import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { RouteService } from '../../../shared/services/route.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  activeRoute:String = 'home';
  subscription: Subscription;

  constructor(
    private router : Router,
    private routeService : RouteService
  ) { 
    this.routeService.currentRoute.subscribe(
      value =>{
        this.activeRoute = value;
      }
    )
  }

  routeChnage(route){
    this.activeRoute = route;
  }

  ngOnInit() {
    this.routeService.setCurrentRoute(this.router.url.split('/')[2]);
    //this.activeRoute = this.router.url.split('/')[2];
  }

}
