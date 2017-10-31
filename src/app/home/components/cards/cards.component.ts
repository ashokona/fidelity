import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { HomeService } from '../../../shared/services/home.service';
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotificationsService } from 'angular2-notifications-lite';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  isLoading:Boolean = true;
  display: boolean = false;
  proceedSubmit: boolean = false;
  source: LocalDataSource;
  timeRangeData: any[];
  cardStatusList: any[];
  cardsList: any[];
  filterData: filterData;
  isAllSelected: string;
  cardDetails:card;
  addNewCardError:string= '';
  idCustomerValidation = true

  selectedCardList: any[] = [];
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

  settings = {
    selectMode: 'multi',
    columns: {
      idCard: {
        title: 'Card Code'
      },
      idCustomer: {
        title: 'Customer Code'
      },
      cdStatus: {
        title: 'Status'
      }
    },
    actions: {
      custom: [
        {
          name: 'duplicate',
          title: 'Change Status ',
        },
      ],
      delete: true,
      edit:false,
      position:'right'
    },
    Actions: //or something
    {
      title:'Detail',
      type:'html',
      valuePrepareFunction:(cell,row)=>{
        return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
      },
      filter:false       
    },
    hideSubHeader: true,
    noDataMessage: "No data Found",
    mode:'external',
    pager : {
      display : true,
      perPage:10
    }
  };

  constructor(
    private _sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private homeService: HomeService,
    private confirmationService: ConfirmationService,
    private _service: NotificationsService
  ) {

    this.timeRangeData = [
      { id: 1, name: "All" },
      { id: 2, name: "Last Month" },
      { id: 3, name: "Last Week" },
      { id: 4, name: "Yesterday" },
    ]

    this.filterData = {
      timeRange: 1,
      status: '',
      idCard:'',
      idCustomer:''
    }

    this.cardDetails = {
      idCard: '',
      idCustomer:'',
      proceed: undefined
    }

  }
  test(){
    console.log("test called")
  }

  onRowSelect(event) {
    if (event.isSelected === null) {
      this.selectedCardList = []
      event.selected.forEach(element => {
        this.selectedCardList.push(element.idCard)
      });
    }
    else {
      var index = this.selectedCardList.indexOf(event.data.idCard);
      if (event.isSelected && (index === -1)) {
        this.selectedCardList.push(event.data.idCard);
      }
      else {
        this.selectedCardList.splice(index, 1);
      }
    }
  }

  onDelete(event) {
    this.confirmationService.confirm({
      message: 'Are you sure To Delete the card?',
      header: 'Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.isLoading = true;        
        this.homeService.deleteCard(event.data.idCard)
                        .subscribe(res=>{
                          if(res.statusCode == 'OK'){
                            this.isLoading = false;                            
                            this._service.success('Card Deleted Sccessfully', '', this.successOptions);
                            this.initCardsList(0,99999999999999,'','','')
                          }else{
                            this.isLoading = false;                            
                            this._service.error('Card Not Deleted', '', this.errorOptions);
                          }
                        }, err=> {
                          console.log(err)
                        })
      }
    });
  }

  changeCustomerId($event){
    this.cardDetails.idCustomer = $event + ''
    if(this.cardDetails.idCustomer.length >= 9){
      var flag = true;
      var idx = 0;
      if(this.cardDetails.idCustomer.substr(0, 1) == "+")
        idx = 1;

      for(var i = idx ; i < this.cardDetails.idCustomer.length ; i++){
        var ch = this.cardDetails.idCustomer.substr(i, 1)
        if(isNaN(parseInt(ch))){
          flag = false;
          break;
        }
      }

      if(!flag)
        this.idCustomerValidation = false
      else
        this.idCustomerValidation = true
    }else{
      this.idCustomerValidation = true
    }
  }



  deleteSelected() {
    this.confirmationService.confirm({
        message: 'Delete or Suspend the Selected Items',
        header: 'Confirmation',
        icon: 'fa fa-question-circle',
        key:'multiple',
        accept: () => {
          this.isLoading = true;          
          this.selectedCardList.forEach(card => {
            this.homeService.deleteCard(card)
                            .subscribe(res=>{
                              if(res.statusCode == 'OK'){
                                this.isLoading = false;                                
                                this._service.success('Deleted Sccessfully', '', this.successOptions);
                                var index = this.selectedCardList.indexOf(card);
                                this.selectedCardList.splice(index, 1);
                                this.initCardsList(0,99999999999999,'','','')
                              }else{
                                this.isLoading = false;                                
                                this._service.error('Not deleted', '', this.errorOptions);
                                
                              }
                            }, err=> {
                              console.log(err)
                            })
                          
          });

        },
        reject: () => {
          this.isLoading = true;          
          this.selectedCardList.forEach(card => {
            this.homeService.disableSelectedCard(card)
                            .subscribe(res=>{
                              if(res.statusCode == 'OK'){
                                this.isLoading = false;                                
                                this._service.success('Card Status Changed ', '', this.successOptions);
                                this.initCardsList(0,99999999999999,'','','')
                              }else{
                                this.isLoading = false;                                
                                this._service.error('Card Status not Changed ', '', this.errorOptions);
                              }
                            }, err=> {
                              console.log(err)
                            })
                          
          });
          
        }
    });



  }

  onCustom(event) {
    if(event.data.cdStatus === 'E'){
      var confMessage = 'Are you sure To Disable the card?'
    }else{
      var confMessage = 'Are you sure To Enable the card?'      
    }
    this.confirmationService.confirm({
      message: confMessage,
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        console.log(event)
        this.isLoading = true;  
        if(event.data.cdStatus === 'E'){
          this.homeService.disableSelectedCard(event.data.idCard)
            .subscribe(res=>{
              if(res.statusCode == 'OK'){
                this.isLoading = false;                            
                this._service.success('Card Status Changed ', '', this.successOptions);
                this.initCardsList(0,99999999999999,'','','')
              }else{
                this.isLoading = false;                            
                this._service.error('Card Status not Changed ', '', this.errorOptions);
              }
            }, err=> {
              console.log(err)
            })
        }  
        else{
          this.homeService.enableSelectedCard(event.data.idCard)
          .subscribe(res=>{
            if(res.statusCode == 'OK'){
              this.isLoading = false;                            
              this._service.success('Card Status Changed ', '', this.successOptions);
              this.initCardsList(0,99999999999999,'','','')
            }else{
              this.isLoading = false;                            
              this._service.error('Card Status not Changed ', '', this.errorOptions);
            }
          }, err=> {
            console.log(err)
          })
        }    

      }
    });

  }
  filterCards(toDate, fromDate, status) {
    var filteredCardList = [];
    this.cardsList.forEach(card => {
      if ((toDate - card.objectVersion) < (card.objectVersion - fromDate) && status.indexOf(card.cdStatus) > -1) {
        filteredCardList.push(card);
      }
    })
    return filteredCardList;
  }

  searchData(data) {
    var date = new Date();
    var yesterday = new Date();
    var lastWeek = new Date();
    var lastMonth = new Date();

    var toDate = parseInt((new Date(date).getTime()).toFixed(0));

    var status = data.status
    if(status == 'A'){
      status = ""
    }
    
    if (data.timeRange == 4) {
      yesterday.setDate(date.getDate() - 1);
      let fromDate = parseInt((new Date(yesterday).getTime()).toFixed(0));
      this.initCardsList(fromDate,99999999999999, status, data.idCard,data.idCustomer)      
      // this.source = new LocalDataSource(this.filterCards(toDate, fromDate, data.status));
    }
    else if (data.timeRange == 3) {
      lastWeek.setDate(date.getDate() - 7);
      let fromDate = parseInt((new Date(lastWeek).getTime()).toFixed(0));
      this.initCardsList(fromDate,99999999999999, status, data.idCard,data.idCustomer)      
      // this.source = new LocalDataSource(this.filterCards(toDate, fromDate, data.status));
    }
    else if (data.timeRange == 2) {
      lastMonth.setDate(date.getDate() - 30);
      let fromDate = parseInt((new Date(lastMonth).getTime()).toFixed(0));
      this.initCardsList(fromDate,99999999999999, status, data.idCard,data.idCustomer)
      // this.source = new LocalDataSource(this.filterCards(toDate, fromDate, data.status));
    } else if (data.timeRange == 1){    
      this.initCardsList(0,99999999999999,status,data.idCard,data.idCustomer)
    }
  }

  resetFilter() {
    this.filterData = {
      timeRange: 1,
      status: '',
      idCard: '',
      idCustomer: ''
    }
    this.initCardsList(0,99999999999999,'','','')
  }
  
  addNewCard() {
    this.display = true;
    this.proceedSubmit = false;
  }
  saveNewCard(newcardform, form){
    let path = 'card/save'
    if(this.proceedSubmit){
      let newCard = {
        idCard: newcardform.idCard,
        idCustomer:newcardform.idCustomer,
        proceed : this.cardDetails.proceed
      } 
      this.homeService.addNewCard(path, newCard)
      .subscribe(res=>{
        if(res.errorMessages.length != 0 && res.statusCode === 'KO'){
          console.log("error")                        
          this.addNewCardError = "enter correct data"
        }else if(res.statusCode === 'OK'){                    
          this._service.success('New Card Added', '', this.successOptions);
          this.display = false;
          form.reset();
          this.addNewCardError= '';
          this.initCardsList(0,99999999999999,'','','')
        }
      })
    }else{
      let newCard = {
        idCard: newcardform.idCard,
        idCustomer:newcardform.idCustomer
      } 
      this.homeService.addNewCard(path, newCard)
                      .subscribe(res=>{
                        if(res.errorMessages.length != 0 && res.statusCode === 'KO'){                    
                          this.addNewCardError = res.errorMessages[0]
                        }
                        else if((res.infoMessages.length === 1) && (res.statusCode === 'OK')){
                          this.addNewCardError = res.infoMessages[0]
                          this.proceedSubmit = true;
                        }else if(res.statusCode === 'OK'){         
                          this._service.success('New Card Added', '', this.successOptions);
                          this.display = false;
                          form.reset();
                          this.addNewCardError= '';
                          this.initCardsList(0,99999999999999,'','','')
                        }else{                      
                        }
                      })
    }
    
    
  }


  initCardsList(from,to,status,idCard,idCustomer){
    var path = "card/query";
    var body = {
      tsFrom: from,
      tsTo: to,
      status: status,
      idCard: idCard,
      idCustomer: idCustomer
    }
    this.homeService.queryCards(path, body)
      .subscribe(res => {
        this.cardsList = res.data;
        this.isLoading = false;
        this.source = new LocalDataSource(this.cardsList);
      }, err => {
        console.log(err)
      }
      )
  }
  ngOnInit() {
    this.initCardsList(0,99999999999999, '','','')


    this.homeService.cardStatus()
      .subscribe(res => {
        this.filterData.status = res[0].value
        this.cardStatusList = res;
        console.log(this.cardStatusList)
      }, err => {
        console.log(err)
      }
    )
      
      
  }


}

export interface filterData {
  timeRange: number;
  status: String;
  idCard:String;
  idCustomer:String
}

export interface card{
  idCard:String,
  idCustomer:String,
  proceed: Boolean
}
