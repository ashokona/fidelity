import { Component, OnInit } from '@angular/core';
import { MultiStepService } from '../../../../shared/services/multi-step.service';
import { HomeService } from '../../../../shared/services/home.service';
import { Subscription }   from 'rxjs/Subscription';
import { campaignData } from'../formdata.model';
import { environment } from '../../../../../environments/environment';



@Component({
  selector: 'app-summary-submission',
  templateUrl: './summary-submission.component.html',
  styleUrls: ['./summary-submission.component.css']
})
export class SummarySubmissionComponent implements OnInit {

  subscription: Subscription;
  campaignData:any;
  otherCampaignData:OtherCampaignData;
  xlsImportData:any;
  imageData:any;
  campaignCredits : CampaignCredits;
  dateFormat : string;
  authorized: boolean;
  constructor(
    private multiStepService : MultiStepService,
    private homeService : HomeService
  ) {
    this.dateFormat = environment.summaryFormat;
    this.authorized = false;
    this.campaignCredits = {
      cdProduct : '',
      nrCustomer : 0,
      qtFreebe : 0,
      smsMessage : ''
    };
    this.otherCampaignData = {
      totalSms : 0,
      goodies : 0,
      ticCost : 0
    };
    this.subscription = this.multiStepService.campaignData.subscribe(
      data => {
        this.campaignData = data;
      }
    );
    this.subscription = this.multiStepService.campaignCards.subscribe(
      data => {
        this.xlsImportData = data;
      }
    );
    this.subscription = this.multiStepService.campaignImage.subscribe(
      data => {

      }
    );
  }
  initCampaignCredits(){
    this.campaignCredits.cdProduct = this.campaignData.cdProduct;
    this.campaignCredits.nrCustomer = this.xlsImportData.campaignDetailsList.length;
    this.campaignCredits.qtFreebe = this.campaignData.qtFreebee;
    this.campaignCredits.smsMessage = this.campaignData.smsMessage;
    this.homeService.campaignCredits(this.campaignCredits).subscribe(
      res =>{
        this.otherCampaignData.totalSms = res.data.smsNumber * this.xlsImportData.campaignDetailsList.length;
        this.otherCampaignData.goodies = this.campaignCredits.qtFreebe * this.xlsImportData.campaignDetailsList.length;
        this.otherCampaignData.ticCost = res.data.campaignCredits;
        this.otherCampaignData.totalSms = res.data.smsNumber;
        this.authorized = res.data.authorized;
        this.multiStepService.setDoneButtonState(!this.authorized);
      }
    );
  }
  ngOnInit() {
    this.initCampaignCredits();

  }
  ngOnDestroy(){
    // this.multiStepService.setCampaignData('');
    // this.multiStepService.setCardsData({qtFreebee:undefined,cdProduct:undefined,campaignDetailsList:[],rejectedCardsList:[]});
    // this.multiStepService.setImageData({imageUrl:'',imageFileName:''});
  }


}

interface CampaignCredits{
  cdProduct:string;
  nrCustomer:number;
  qtFreebe:number;
  smsMessage:string;
}

interface OtherCampaignData{
  totalSms:number;
  goodies:number;
  ticCost:number;
}

