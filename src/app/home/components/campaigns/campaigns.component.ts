import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { HomeService } from '../../../shared/services/home.service';
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications-lite';

import { RouteService } from '../../../shared/services/route.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})

export class CampaignsComponent implements OnInit {
  isLoading: Boolean = true;

  display: boolean = false;
  source: LocalDataSource;

  timeRangeData: any[];
  campaignStatusList: any[];
  campaignsList: any[];
  filterData: filterData;
  isAllSelected: string;

  selectedCampaignsList: any[] = [];

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
      tsPublication: {
        title: 'Publishing'
      },
      dsCampaign: {
        title: 'Description'
      },
      tsPrintingStart: {
        title: 'Start'
      },
      cdProduct: {
        title: 'Pr'
      },
      // statisticsSent: {
      //   title: 'snt'
      // },
      // statisticsPrinted: {
      //   title: 'Prn'
      // },
      cdStatus: {
        title: 'Status'
      }
    },
    actions: {
      custom: [
        {
          name: 'duplicate',
          title: 'Suspend ',
        },
      ],
      delete: true,
      edit:false,
      position:'right'
    },
    hideSubHeader: true,
    noDataMessage: "No data Found",
    mode: 'external',
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
    private _service: NotificationsService,
    private router : Router,
    private routeService : RouteService
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
      idPremise : 1
    }
  }


  onRowSelect(event) {
    if (event.isSelected === null) {
      this.selectedCampaignsList = []
      event.selected.forEach(element => {
        this.selectedCampaignsList.push(element.idCampaign)
      });
    }
    else {
      var index = this.selectedCampaignsList.indexOf(event.data.idCampaign);
      if (event.isSelected && (index === -1)) {
        this.selectedCampaignsList.push(event.data.idCampaign);
      }
      else {
        this.selectedCampaignsList.splice(index, 1);
      }
    }
  }

  onDelete(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.homeService.deleteCard(event.data.idCard)
                        .subscribe(res=>{
                          if(res.statusCode == 'OK'){
                            this.isLoading = false;
                            this._service.success('Card Deleted Sccessfully', '', this.successOptions);
                            this.initCampaignsList(0,99999999999999, '')
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

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.selectedCampaignsList.forEach(campaign => {
          this.homeService.deleteCard(campaign)
                          .subscribe(res=>{
                            if(res.statusCode == 'OK'){
                              this.isLoading = false;
                              this._service.success('Deleted Sccessfully', '', this.successOptions);
                              var index = this.selectedCampaignsList.indexOf(campaign);
                              this.selectedCampaignsList.splice(index, 1);
                              this.initCampaignsList(0,99999999999999, '')
                            }else{
                              this.isLoading = false;
                              this._service.error('Not deleted', '', this.errorOptions);
                              
                            }
                          }, err=> {
                            console.log(err)
                          })
                        
        });
      }
    });

  }
  statusChangeSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.selectedCampaignsList.forEach(campaign => {
          this.homeService.disableSelectedCampaign(campaign)
                          .subscribe(res=>{
                            if(res.statusCode == 'OK'){
                              this.isLoading = false;
                              this._service.success('Campagin Status Changed ', '', this.successOptions);
                              this.initCampaignsList(0,99999999999999, '')
                            }else{
                              this.isLoading = false;
                              this._service.error('Campagin Status not Changed ', '', this.errorOptions);
                            }
                          }, err=> {

                            this.isLoading = false;
                            console.log(err)
                          })
                        
        });
      }
    });

  }
  onCustom(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.homeService.disableSelectedCampaign(event.data.idCampaign)
                        .subscribe(res=>{
                          if(res.statusCode == 'OK'){
                            this.isLoading = false;
                            this._service.success('Card Status Changed ', '', this.successOptions);
                            this.initCampaignsList(0,99999999999999, '')
                          }else{
                            this.isLoading = false;
                            this._service.error('Card Status not Changed ', '', this.errorOptions);
                          }
                        }, err=> {
                          console.log(err)
                        })
      }
    });

  }
  filterCards(toDate, fromDate, status) {
    var filteredCardList = [];
    this.campaignsList.forEach(campaign => {
      if ((toDate - campaign.objectVersion) < (campaign.objectVersion - fromDate) && status.indexOf(campaign.cdStatus) > -1) {
        filteredCardList.push(campaign);
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

    if (data.timeRange == 4) {
      yesterday.setDate(date.getDate() - 1);
      let fromDate = parseInt((new Date(yesterday).getTime()).toFixed(0));
      this.initCampaignsList(fromDate,99999999999999, data.status)
    }
    else if (data.timeRange == 3) {
      lastWeek.setDate(date.getDate() - 7);
      let fromDate = parseInt((new Date(lastWeek).getTime()).toFixed(0));
      this.initCampaignsList(fromDate,99999999999999, data.status)
    }
    else if (data.timeRange == 2) {
      lastMonth.setDate(date.getDate() - 30);
      let fromDate = parseInt((new Date(lastMonth).getTime()).toFixed(0));
      this.initCampaignsList(fromDate,99999999999999, data.status)
    } else {
      this.initCampaignsList(0,99999999999999, data.status)
    }
  }

  resetFilter() {
    this.filterData = {
      timeRange: 1,
      status: '',
      idPremise : 1
    }
    this.initCampaignsList(0,99999999999999, '')
  }
  
  addNewCampaign() {
    this.routeService.setCurrentRoute('newcampaigns')
    this.router.navigate(['home/newcampaigns'])
  }



  initCampaignsList(fromDate, toDate, status){
    this.isLoading = true;
    var body = {
      tsFrom: fromDate,
      tsTo: toDate,
      status: status,
      idPremise: 0
    }
    this.homeService.getCampaigns(body)
      .subscribe(res => {
        console.log(res.data)
        this.campaignsList = res.data;
        this.isLoading = false;
        this.source = new LocalDataSource(this.campaignsList);
      }, err => {
        console.log(err)
      }
      )
  }
  ngOnInit() {
   
    this.initCampaignsList(0,99999999999999, '')

    
    this.homeService.campaignStatus()
      .subscribe(res => {
        this.campaignStatusList = res;
        this.campaignStatusList.push({value:'',description:'All Status'})
      }, err => {
        console.log(err)
      }
    )
      
      
  }


}

export interface filterData {
  timeRange: number;
  status: String;
  idPremise : number
}

export interface campaign{
  idCard:String,
  idCustomer:String
}


