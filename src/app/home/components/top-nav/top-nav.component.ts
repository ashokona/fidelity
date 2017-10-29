import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { JwtService } from '../../../shared/services/jwt.service';
import { UserService } from '../../../shared/services/user.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  currentUserName:String;

  constructor(
    private router: Router,
    private jwtService : JwtService,
    private userService : UserService
  ) { }

  private logout(){
    this.userService.purgeAuth();
    this.router.navigate(['/'])
  }

  ngOnInit() {
    this.currentUserName = this.jwtService.getUser();
  }

}
