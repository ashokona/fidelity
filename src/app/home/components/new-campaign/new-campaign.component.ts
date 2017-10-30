import { Component, OnInit, AfterViewChecked, ChangeDetectorRef,ChangeDetectionStrategy, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { CampaignDataComponent } from './campaign-data/campaign-data.component';
import { Campaign } from '../../../shared/models/campaign.model';

import { MultiStepService } from '../../../shared/services/multi-step.service';
import { HomeService } from '../../../shared/services/home.service';
import { FormDataService } from './formservice.service';
import { RouteService } from '../../../shared/services/route.service';

import { NotificationsService } from 'angular2-notifications-lite';

//import { NotificationsService } from 'angular2-notifications-lite';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit, OnDestroy {

  @Input() formData;
  prevButton: boolean = false;
  nextButton: boolean = true;
  nextButtonState: boolean ;
  doneButton : boolean = false;
  route: string ;
  newCampaign: Campaign;
  subscription: Subscription;
  imageData:any;
  cardsData:any;
  public successOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10
  }

  public errorOptions = {
    timeOut: 500000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10
  }
  constructor(
    private router : Router,
    private multiStepService : MultiStepService,
    private homeService : HomeService,
    private changeDetection : ChangeDetectorRef,
    private formDataService: FormDataService,
    private _service: NotificationsService,
    private routeService : RouteService
  ) {

    this.subscription = multiStepService.currentRoute.subscribe(
      value => {
        this.route = value
        this.naviagte();
      }
    );

    this.subscription = this.multiStepService.isNextButtonState.subscribe(
      value => {
        this.nextButtonState = value;
      }
    );

  }


  naviagte(){
    //this.set()
    this.router.navigate(['/home/newcampaigns/'+ this.route])
  }

  ngOnDestroy(){
    this.changeDetection.detach();
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.changeDetection.detectChanges();
  }

  prvView(){
    if(this.route == 'cardimport'){
      this.prevButton = false;
      this.doneButton = false;
      this.multiStepService.setCurrentRoute('data'); 
      this.router.navigate(['/home/newcampaigns/data']);
      this.changeDetection.detectChanges();
    }else if(this.route == 'imageimport'){
      this.doneButton = false;
      this.multiStepService.setCurrentRoute('cardimport') 
      this.router.navigate(['/home/newcampaigns/cardimport']);
      this.changeDetection.detectChanges();
    }else if(this.route == 'summary'){
      this.nextButton = true;
      this.doneButton = false;
      this.multiStepService.setCurrentRoute('imageimport') 
      this.router.navigate(['/home/newcampaigns/imageimport']);
      this.changeDetection.detectChanges();     
    }
    
  }
  nxtView(){
    if(this.route === 'data'){    
      this.prevButton = true;
      this.multiStepService.setCurrentRoute('cardimport')
      this.router.navigate(['/home/newcampaigns/cardimport']);
    }else if(this.route === 'cardimport'){    
      this.multiStepService.setCurrentRoute('imageimport')
      this.router.navigate(['/home/newcampaigns/imageimport'])  
    }else if(this.route === 'imageimport'){   
      this.nextButton = false;
      this.doneButton = true;
      this.multiStepService.setCurrentRoute('summary') 
      this.router.navigate(['/home/newcampaigns/summary'])  
    }
  }
  done(){
    this.subscription = this.multiStepService.campaignData.subscribe(
      data => {
        this.newCampaign = data;
      }
    );
    this.subscription = this.multiStepService.campaignCards.subscribe(
      data => {
        this.cardsData = data;
      }
    );
    this.subscription = this.multiStepService.campaignImage.subscribe(
      data => {
        this.imageData = data

      }
    );
    //xls import data 
    this.newCampaign.campaignDetailsList = this.cardsData.campaignDetailsList
    this.newCampaign.qtFreebee = this.cardsData.qtFreebee;

    //image data
    this.newCampaign.imageUrl = this.imageData .imageUrl;
    this.newCampaign.imageFileName = this.imageData.imageFileName;

    this.newCampaign.idPremise = 5
    this.newCampaign.tsPublication = parseInt((new Date(this.newCampaign.tsPublication).getTime()).toFixed(0));
    this.newCampaign.tsPrintingStart = parseInt((new Date(this.newCampaign.tsPrintingStart).getTime()).toFixed(0));
    this.newCampaign.tsPrintingEnd = parseInt((new Date(this.newCampaign.tsPrintingEnd).getTime()).toFixed(0));
    this.newCampaign.tsValidStart = parseInt((new Date(this.newCampaign.tsValidStart).getTime()).toFixed(0));
    this.newCampaign.tsValidEnd = parseInt((new Date(this.newCampaign.tsValidEnd).getTime()).toFixed(0));
    this.homeService.addNewCampaign(this.newCampaign).subscribe(res=>{
      if(res.statusCode == "OK"){
        this.multiStepService.setCampaignData('');
        this.multiStepService.setCardsData({qtFreebee:undefined,cdProduct:undefined,campaignDetailsList:[]});
        this.multiStepService.setImageData({imageUrl:'',imageFileName:''});
        this.multiStepService.setCurrentRoute('data')     
        this.routeService.setCurrentRoute('campaigns')
        this.router.navigate(['/home/campaigns']);
        this._service.success('Campaign added sucessfully', '', this.successOptions);
        this.multiStepService.setSummaryData(res.data);
      }else if(res.statusCode == 'KO'){
        this.multiStepService.setCurrentRoute('data') 
        this.router.navigate(['/home/newcampaigns/data']) 
        this._service.error('Incorrect data entered', 'Enter correct data', this.errorOptions);
      }
      else {
        this.multiStepService.setCurrentRoute('data') 
        this.router.navigate(['/home/newcampaigns/data']) 
        this._service.error('Some error occured', 'Reenter data', this.errorOptions);
      }
    })
  
  }
  ngOnInit() {
    if(this.prevButton == null){
      // this.setPrvButton()
    }
     this.naviagte()
  }

}

