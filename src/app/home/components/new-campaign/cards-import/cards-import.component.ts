import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/catch';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormDataService } from '../formservice.service';
import { cardsImport } from '../formdata.model'
import { MultiStepService } from '../../../../shared/services/multi-step.service';
import { NgModel, DefaultValueAccessor, NgControl } from '@angular/forms'
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription }   from 'rxjs/Subscription';
import { environment } from '../../../../../environments/environment';

import { NotificationsService } from 'angular2-notifications-lite';

@Component({
  selector: 'app-cards-import',
  templateUrl: './cards-import.component.html',
  styleUrls: ['./cards-import.component.css']
})
export class CardsImportComponent implements OnInit, OnDestroy {
  isLoading: Boolean = true;
  filename:String;

  subscription: Subscription;
  documents: cardsImport;

  showLoadedData: Boolean = true;
  xlsImportDetails: XlsImportDetails;
  loadedCards : any[];
  rejectedCards : any[];
  campaignData : any;

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
    private multiStepService: MultiStepService,
    public http : Http,
    public jwtService : JwtService,
    public formService : FormDataService,
    private _service: NotificationsService
  ) {
      this.xlsImportDetails={
        qtFreebee : 0,
        cdProduct : 0,
        campaignDetailsList: [],
        rejectedCardsList:[]
      }
      this.documents =this.formService.getcardsImport();
      this.subscription = this.multiStepService.campaignData.subscribe(
        data => {
          if(data){
            this.campaignData = data;
          }
        }
      );

      this.subscription = this.multiStepService.campaignCards.subscribe(
        data => {
          if(data.campaignDetailsList.length != 0 ){
            this.loadedCards = data.campaignDetailsList;
            this.rejectedCards = data.rejectedCardsList
            this.multiStepService.setNextButtonState(false);
          }else{
             this.multiStepService.setNextButtonState(true);
          }
        }
      );

   }

  ngOnInit() {


    this.isLoading = false;
  }

  changeData(){
    this.showLoadedData = !this.showLoadedData
  }

  ngOnDestroy(){
  }


  updated($event){
    this.isLoading = true;
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    this.filename = file.name;
    const formData = new FormData();
    formData.append('fileXls', file);
    formData.append('qtFreebe', '2');
    formData.append('cdProduct', 'MS');
    let token = window.localStorage['jwtToken'];
    const headers = new Headers({
      'Authorization': `Bearer ${this.jwtService.getToken()}`
    })

    let options = new RequestOptions({headers});
    let url = environment.api_url+"campaign/upxls";
    this.http.post(url, formData, options).map(res => res.json()).subscribe(
      res => {
        console.log(res);
        if(res.statusCode == 'OK'){
          this._service.success('Imported Sucessfully', '', this.successOptions);
          this.isLoading = false;
          this.loadedCards = res.data
          this.rejectedCards = res.infoMessages
          this.xlsImportDetails.cdProduct = this.campaignData.cdProduct;
          this.xlsImportDetails.qtFreebee = 2;
          this.xlsImportDetails.campaignDetailsList = res.data;
          this.xlsImportDetails.rejectedCardsList = res.infoMessages;
          this.multiStepService.setCardsData(this.xlsImportDetails);
          this.multiStepService.setNextButtonState(false);
        }else if(res.statusCode == 'KO'){
          this.isLoading = false;
          this._service.error('Failed to import', 'Upload Correct File', this.errorOptions);
        }
        else {
          this.isLoading = false;
          this._service.error('Some error  occured', 'Contact administrator', this.errorOptions);
        }
 
      }, 
      err=> {
        console.log(err)
    })
  }

}

interface XlsImportDetails {
  qtFreebee : number;
  cdProduct : number;
  campaignDetailsList: any[];
  rejectedCardsList: any[];
}