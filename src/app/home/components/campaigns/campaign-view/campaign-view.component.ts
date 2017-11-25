import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { HomeService } from '../../../../shared/services/home.service';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
  isLoading: Boolean = true;  
  idCampaign:Number
  campaignData:any;
  viewCampaignData: Boolean = true; 
  viewCampaignCards: Boolean = false; 
  viewCampaignImage: Boolean = false; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homeService : HomeService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.idCampaign = params['id'];
      this.initCampaignData(this.idCampaign)
    });

  }

  initCampaignData(idCampaign){
    this.homeService.viewCampaign(idCampaign).subscribe(
      res =>{
        this.isLoading = false;
        this.campaignData = res.data;
        this.campaignData.tsPrintingEnd = new Date(res.data.tsPrintingEnd);
        this.campaignData.tsPrintingStart = new Date(res.data.tsPrintingStart);
        this.campaignData.tsValidEnd = new Date(res.data.tsValidEnd);
        this.campaignData.tsValidStart = new Date(res.data.tsValidStart);
        this.campaignData.tsPublication = new Date(res.data.tsPublication);
      }
    )
  }

  showCampaignData(){
    this.viewCampaignData = true; 
    this.viewCampaignCards= false; 
    this.viewCampaignImage = false;
  }
  showCampaignCards(){
    this.viewCampaignData = false; 
    this.viewCampaignCards= true; 
    this.viewCampaignImage = false;
  }
  showCampaignImage(){
    this.viewCampaignData = false; 
    this.viewCampaignCards= false; 
    this.viewCampaignImage = true;
  }

  downloadCampaign(){
    this.homeService.downloadCampaign(this.idCampaign).subscribe(
      res =>{
        console.log(res);
      }
    )
  }
}
