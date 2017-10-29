import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/services/user.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  timedOut = false;

  constructor(
    private userService : UserService,
    private idle: Idle,
     private keepalive: Keepalive
  ){
    idle.setIdle(149);
    idle.setTimeout(149);
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => console.log('No longer idle.'));
    idle.onTimeout.subscribe(() => {
      this.reset();  
      this.userService.populate();
    });

    this.idle.watch()
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }
  

  ngOnInit(){
    this.userService.populate();
  }

}
