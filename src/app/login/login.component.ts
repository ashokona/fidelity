import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NotificationsService } from 'angular2-notifications-lite';

import { UserService } from '../shared/services/user.service';
import { RouteService } from '../shared/services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user:any;

  public options = {
    position: ["top", "right"],
    // timeOut: 5000,
    lastOnBottom: true,
  };

  public successOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10
  }

  public errorOptions = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10
  }


  constructor(
    private router: Router,
    private userService : UserService,
    private routeService : RouteService,
    private _service: NotificationsService
  ) {
    this.user = {
      username: '',
      password: ''
    }
  }

  login(user){
    var userCredentials = {
      username:user.username,
      password:user.password
    }
    var type = 'authentication'
    this.userService.attemptAuth(type,userCredentials)
                    .subscribe(
                      res=>{
                        if(res.status === 0){
                          this.routeService.setCurrentRoute('dashboard')
                          this._service.success('Logged In Successfully', '', this.successOptions);
                          this.router.navigate(['/home']);
                        }else{
                          this._service.error('Invalid Credentials', 'Login again', this.errorOptions);
                          this.routeService.setCurrentRoute('')
                          this.router.navigate(['']);
                        }
                        
                      },
                      err=>{
                        console.log(err)
                      }
                    )
  }

  ngOnInit() {
  }

}
