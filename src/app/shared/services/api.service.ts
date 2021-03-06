import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams,RequestOptions ,ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { JwtService } from './jwt.service';


@Injectable()
export class ApiService {
  public userservice : UserService;
  constructor(
    private http: Http,
    private route: Router,
    private jwtService: JwtService,
    injector:Injector    
  ) { 
    setTimeout(() => this.userservice = injector.get(UserService));
  }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        if (error.status == 401) {
          this.userservice.purgeAuth();
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        if (error.status == 401) {
          this.userservice.purgeAuth();
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        if (error.status == 401) {
          this.userservice.purgeAuth();          
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
    //.catch(this.formatErrors)
  }

  post1(path: string, body: Object = {}): Observable<Blob> {
    let headers = new Headers({ 'Content-Type': 'application/json',  'Authorization' :`Bearer ${this.jwtService.getToken()}` });
    let options = new RequestOptions({headers: headers,
      responseType: ResponseContentType.Blob,
    });
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
       options
    )
      .map(res => res.blob())
      .catch((error) => {
        console.log(error)
        if (error.status == 401) {
          this.userservice.purgeAuth();          
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
    //.catch(this.formatErrors)
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        if (error.status == 401) {
          this.userservice.purgeAuth();          
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
  }
  postFormData(path: string, body): Observable<any> {

    return this.http.post(
      `${environment.api_url}${path}`,
      body,
      { headers: this.setHeaders() }
    )
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        if (error.status == 401) {
          this.userservice.purgeAuth();          
          this.route.navigate(['']);
        }
        return Observable.throw(error.json());
      });
    //.catch(this.formatErrors)
  }
}
