import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { HomeService } from '../../../shared/services/home.service';

import { NotificationsService } from 'angular2-notifications-lite';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading:Boolean = true;
  filterData: filterData;
  campaignStatusList:IMultiSelectOption;
  timeRangeData:any[];

  constructor(
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
      timeRange: 2,
      status: [],
      idCard:'',
    }
  }

  ngOnInit() {
    this.initActiveCampaigns(0,99999999999999,'','')
    this.homeService.campaignStatus()
      .subscribe(res => {
        this.filterData.status = res[0].value
        this.campaignStatusList = res.map(m => ({ id: m.value, name: m.description }));
      }, err => {
        console.log(err)
      }
    )
  }
  
  initActiveCampaigns(from,to,status,idCard){
    let data = {
      tsFrom:from,
      tsTo:to,
      status:​ ​ status,
      idCard:idCard
    }
    console.log(data);
    this.homeService.queryActiveCampaigns(data).subscribe(
      res =>{
        console.log(res);
      }
    )
  }

  downloadXls(){
    this.homeService.downloadXls().subscribe(
      res =>{
        console.log(res);
      }
    )
  }

  searchData(data) {
    console.log(data);
    var date = new Date();
    var yesterday = new Date();
    var lastWeek = new Date();
    var lastMonth = new Date();

    var toDate = parseInt((new Date(date).getTime()).toFixed(0));
    let statusList = ''
    data.status.forEach(status => {
      statusList = statusList + status + ','
    });
    console.log(statusList)
    
    if (data.timeRange == 4) {
        yesterday.setDate(date.getDate() - 1);
        let fromDate = parseInt((new Date(yesterday).getTime()).toFixed(0));
        this.initActiveCampaigns(0,fromDate,statusList,data.idCard)  
      }
      else if (data.timeRange == 3) {
        lastWeek.setDate(date.getDate() - 7);
        let fromDate = parseInt((new Date(lastWeek).getTime()).toFixed(0));
        this.initActiveCampaigns(0,fromDate,statusList,data.idCard)  
      }
      else if (data.timeRange == 2) {
        lastMonth.setDate(date.getDate() - 30);
        let fromDate = parseInt((new Date(lastMonth).getTime()).toFixed(0));
        this.initActiveCampaigns(0,fromDate,statusList,data.idCard)  
      } else if (data.timeRange == 1){    
        this.initActiveCampaigns(0,99999999999999,'','')
      }
    }

}

export interface filterData {
  timeRange: number;
  status: any[];
  idCard:String
}
