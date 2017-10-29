
import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  getUser(): any {
    return window.localStorage['username'];
  }

  saveToken(token: String, username:String) {
    window.localStorage['jwtToken'] = token;
    window.localStorage['username'] = username;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('username');
  }

}