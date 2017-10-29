import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public options = {
    position: ["top", "right"],
    // timeOut: 5000,
    lastOnBottom: true,
  };
  constructor() { }

  ngOnInit() {
  }

}
