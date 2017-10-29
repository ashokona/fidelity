import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { JwtService } from '../../../../shared/services/jwt.service';
import { FormDataService } from '../formservice.service';
import { cardsImport } from '../formdata.model'
import { MultiStepService } from '../../../../shared/services/multi-step.service';
import { NgModel, DefaultValueAccessor, NgControl } from '@angular/forms'
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription }   from 'rxjs/Subscription';

import { NotificationsService } from 'angular2-notifications-lite';

@Component({
  selector: 'app-image-import',
  templateUrl: './image-import.component.html',
  styleUrls: ['./image-import.component.css']
})
export class ImageImportComponent implements OnInit {
  isLoading:Boolean = true
  imageData: ImageDetails;

  subscription: Subscription;

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
    private multiStepService : MultiStepService,
    public formService : FormDataService,
    public http : Http,
    public jwtService : JwtService,
    private _service: NotificationsService
  ) {
    this.imageData = {
      imageFileName : '',
      imageUrl : ''
    }

    this.subscription = this.multiStepService.campaignImage.subscribe(
      data => {
        if(data.imageUrl != ''){
          this.imageData = data;
          this.multiStepService.setNextButtonState(false);
        }else{
          this.multiStepService.setNextButtonState(true);
        }
      }
    );

  }

  ngOnInit() {
    
    this.isLoading = false;
    // this.multiStepService.setPrevButton(true);
    // this.multiStepService.setNextButton(true);
    // this.multiStepService.setDoneButton(false);
  }
  fileChange($event){
    this.isLoading = true;    
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const formData = new FormData();
    //this.imageData.imageFilename = file.name;
    formData.append('file', file);
    const headers = new Headers({
      'Authorization': `Bearer ${this.jwtService.getToken()}`
    })

    let options = new RequestOptions({headers});
    let url = "http://52.59.47.73/fd/rest/campaign/uploadImage";
    this.http.post(url, formData, options).map(res => res.json()).subscribe(
      res => {
        if(res.statusCode == 'OK'){
          this._service.success('Uploaded Sucessfully', '', this.successOptions);
          this.imageData.imageUrl = res.data;
          this.imageData.imageFileName = res.data.split('/')[5]
          this.isLoading = false;
          this.multiStepService.setNextButtonState(false);    
          this.multiStepService.setImageData(this.imageData)
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
  ngOnDestroy(){
    //this.formService.setcardsImport(this.documents);
  }
}

interface ImageDetails {
  imageUrl : string,
  imageFileName : string,
}
