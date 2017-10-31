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
export class MultiStepService {
  
  private currentRouteSubject = new BehaviorSubject<any>('data');
  public currentRoute = this.currentRouteSubject.asObservable().distinctUntilChanged();

  private isNextButtonStateSubject = new ReplaySubject<boolean>(1);
  public isNextButtonState = this.isNextButtonStateSubject.asObservable();


  private campaignDataSubject = new BehaviorSubject<any>('');
  public campaignData = this.campaignDataSubject.asObservable().distinctUntilChanged();

  public campaignCardsSubject = new BehaviorSubject<XlsImportDetails>({qtFreebee:0,cdProduct:0,campaignDetailsList:[],rejectedCardsList:[]});
  public campaignCards = this.campaignCardsSubject.asObservable().distinctUntilChanged();

  public campaignImageSubject = new BehaviorSubject<ImageDetails>({imageUrl:'',imageFileName:''});
  public campaignImage = this.campaignImageSubject.asObservable().distinctUntilChanged();

  private campaignSummarySubject = new BehaviorSubject<any>('');
  public campaignSummary = this.campaignSummarySubject.asObservable().distinctUntilChanged();

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  public setCurrentRoute(value){
    this.currentRouteSubject.next(value)
  }
  
  public setCampaignData(data){
    this.campaignDataSubject.next(data);
  }
  public getCampaignData(){
    return this.campaignData;
  }

  public setCardsData(data:XlsImportDetails){
    this.campaignCardsSubject.next(data)
  }

  public setImageData(data:ImageDetails){
    this.campaignImageSubject.next(data)
  }

  public setSummaryData(data){
    this.campaignSummarySubject.next(data)
  }


  public setNextButtonState(value){
    this.isNextButtonStateSubject.next(value)
  }

  public getNextButton(){
    
  }

  public getDoneButton(){
    
  }
}

interface XlsImportDetails {
  qtFreebee : number;
  cdProduct : number;
  campaignDetailsList: any[];
  rejectedCardsList: any[]
}
interface ImageDetails {
  imageUrl : string,
  imageFileName : string,
}
