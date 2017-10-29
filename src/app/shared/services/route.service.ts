import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RouteService {

  private currentRouteSubject = new BehaviorSubject<any>('dashboard');
  public currentRoute = this.currentRouteSubject.asObservable().distinctUntilChanged();

  constructor() { }

  setCurrentRoute(value){
    this.currentRouteSubject.next(value)
  }


}
