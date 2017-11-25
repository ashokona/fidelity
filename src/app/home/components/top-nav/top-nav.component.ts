import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { JwtService } from '../../../shared/services/jwt.service';
import { UserService } from '../../../shared/services/user.service';
import { MultiStepService } from '../../../shared/services/multi-step.service';

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
    private userService : UserService,
    private multiStepService: MultiStepService
  ) { }

  private logout(){
    this.multiStepService.setCampaignData('');
    this.multiStepService.setCardsData({qtFreebee:undefined,cdProduct:undefined,campaignDetailsList:[],rejectedCardsList:[]});
    this.multiStepService.setImageData({imageUrl:'',imageFileName:''});
    this.multiStepService.setCurrentRoute('data') 
    this.userService.purgeAuth();
    this.router.navigate(['/']);

  }

  ngOnInit() {
    this.currentUserName = this.jwtService.getUser();
  }

}
