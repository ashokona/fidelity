import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';


@Injectable()
export class UserService {
  

  private currentUserSubject = new BehaviorSubject<any>('');
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();



  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    // if (this.jwtService.getToken()) {
    //   this.apiService.get('/user')
    //   .subscribe(
    //     data => this.setAuth(data),
    //     err => this.purgeAuth()
    //   );
    // } else {
    //   this.purgeAuth();
    // }
    if (this.jwtService.getToken()) {
      var user = {
        "token": this.jwtService.getToken(),
        "username" : this.jwtService.getUser()
      }
      this.apiService.post('authentication',user).subscribe(
        res =>{
          if(res.status === 0){
            this.setAuth(user)
          }
          else{
            this.setAuth(user)
          }
        },err=>{
          this.purgeAuth();
        }
      )
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token, user.username);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next('');
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }


  attemptAuth(type, credentials): Observable<any> {
    return this.apiService.post(type, credentials)
    .map(
      data => {
        this.setAuth(data);
        return data;
      }
    )
  }



  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  


  // send path to main module
  private subject = new Subject<any>();

  sendPath(path: any) {
      this.subject.next( path );
  }

  getPath(): Observable<String> {
      return this.subject.asObservable();
  }

}