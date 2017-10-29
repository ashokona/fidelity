import { Component, OnInit, OnDestroy,ChangeDetectorRef, ViewChild, AfterViewInit,
  EventEmitter,
  Input,
  Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MultiStepService } from '../../../../shared/services/multi-step.service';
import { Campaign } from '../../../../shared/models/campaign.model';
import { HomeService } from '../../../../shared/services/home.service';
import { campaignData } from'../formdata.model';
import { FormDataService } from '../formservice.service';
import { Subscription }   from 'rxjs/Subscription';
import  {format}  from 'date-fns';
import { environment } from '../../../../../environments/environment';
declare var tinymce: any;

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.component.html',
  styleUrls: ['./campaign-data.component.css'],
  
})
export class CampaignDataComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;
  dateFormat : string;
  isLoading: Boolean = true;
  campaignData:Campaign;
  subscription: Subscription;
  maxlength=160;
  characterleft=this.maxlength;
  inputFieldsCount: number = 10;
  dateOptions = {
    autoclose: true,
  }
  campaignType = [
    {name:'M'},
    {name:'MS'},
    {name:'MSP'},
    {name:'SMS'},
  ]
  
  constructor(
    private multiStepService : MultiStepService,
    private homeService : HomeService,
    private changeDetection : ChangeDetectorRef,
    public formService : FormDataService,
    private formBuilder: FormBuilder
  ) { 
    this.dateFormat = 'YYYY-MM-DD HH:mm'
    this.subscription = this.multiStepService.campaignData.subscribe(
      data => {
        if(data){
          this.campaignData = data;
          this.multiStepService.setNextButtonState(false);
        }
        else{
          this.campaignData = {
            cdProduct: '',
            dsCampaign: '',
            message: '',
            smsMessage: '',
            mailSubject: '',
            mailBody: '',
            tsPublication: '',         
            tsPrintingStart: '',
            tsPrintingEnd: '',
            tsValidStart: '',
            tsValidEnd: '',
          }
          this.multiStepService.setNextButtonState(true);
        }
      }
    );
  }


  doSomething(data) {
    this.hasNull(data);
    // this.campaignData.tsPublication = format(this.campaignData.tsPublication,this.dateFormat);
    // this.campaignData.tsPrintingEnd = format(this.campaignData.tsPrintingEnd,this.dateFormat);
    // this.campaignData.tsPrintingStart = format(this.campaignData.tsPrintingStart,this.dateFormat);
    // this.campaignData.tsValidEnd = format(this.campaignData.tsValidEnd,this.dateFormat);
    // this.campaignData.tsValidStart = format(this.campaignData.tsValidStart,this.dateFormat);    
  }

  hasNull(target) {
    console.log()
    let count = this.inputFieldsCount;
    for (var member in target) {
        if (target[member] != ""){
          count--
        }
    }
    if(count>0){

    }else{
      this.multiStepService.setNextButtonState(false);
      this.multiStepService.setCampaignData(this.campaignData);
    }
  }
  requiredFileds(value){
    if(value === 'MS' || value === 'MSP'){
      this.inputFieldsCount = 9;
    }else if( value === 'SMS'){
      this.inputFieldsCount = 8;      
    }else if(value === 'M'){
      this.inputFieldsCount = 8;      
    }else{
      this.inputFieldsCount = 9;      
    }
  }
  count(msg){
    if(this.maxlength>=msg.length){
      this.characterleft=(this.maxlength)-(msg.length);
    }
    else{
       this.campaignData.smsMessage = msg.substr(0, msg.length - 1);
    }
  }

  ngOnInit() {
    this.isLoading = false;
      this.homeService.smsIdentityList().subscribe(data=>{

      })

    this.multiStepService.setCurrentRoute('data');
    
  }
  ngOnDestroy(){
    tinymce.remove(this.editor);
  }
  ngAfterViewInit() {
    tinymce.init({
      selector: '#mailBody',
      plugins: ['link', 'paste', 'table'],
      skin_url: '../../../../../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
          this.campaignData.mailBody = content;
        });
      },
    });
    this.changeDetection.detectChanges();
  }
}
