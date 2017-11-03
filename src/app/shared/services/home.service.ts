import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class HomeService {

  constructor(
    private apiService : ApiService
  ) { }
  
  queryActiveCampaigns(body){
    let path = 'campaign/stat'
    return this.apiService.post(path,body)
                    .map(data =>{
                      return data
                    })
  }
  downloadXls(){
    let path = 'campaign/drilldown'
    return this.apiService.post(path)
                    .map(data =>{
                      return data
                    })
  }

  queryCards(path, body){
    return this.apiService.post(path,body)
                    .map(data =>{
                      return data
                    })
  }

  deleteCard(id){
    var path = 'card/'+id
    return this.apiService.delete(path)
                          .map(data =>{
                            return data
                          })
  }

  disableSelectedCampaign(id){
    var path = '​campaign/abort/'+id;
    return this.apiService.get(path)
                          .map(data =>{
                            return data
                          })
  }

  disableSelectedCard(id){
    var path = 'card/'+id+'/disable'
    return this.apiService.put(path)
                          .map(data =>{
                            return data
                          })
  }

  enableSelectedCard(id){
    var path = 'card/'+id+'/enable'
    return this.apiService.get(path)
                          .map(data =>{
                            return data
                          })
  }

  cardStatus(){
    var path = "select/cardStatus"
    return this.apiService.get(path)
                          .map(data =>{
                            return data
                          })
  }

  addNewCard(path, data){
    return this.apiService.post(path,data)
                          .map(data =>{
                            return data
                          })
  }

  getCampaigns(body){
    let path = "campaign/query"
    return this.apiService.post(path,body)
                          .map(data =>{
                            return data
                          })
  }

  deleteCampaign(id){
    var path = 'card/'+id
    return this.apiService.delete(path)
                          .map(data =>{
                            return data
                          })
  }

  disableSelectedCampaigns(id){
    var path = 'card/'+id+'/disable'
    return this.apiService.get(path)
                          .map(data =>{
                            return data
                          })
  }

  campaignStatus(){
    var path = "select/campaignStatus"
    return this.apiService.get(path)
                          .map(data =>{
                            return data
                          })
  }

  smsIdentityList(){
    let path = 'select/smsIdentity'
    return this.apiService.get(path)
    .map(data =>{
      return data
    })    
  }

  addNewCampaign(data){
    let path = 'campaign/save'
    return this.apiService.post(path,data)
                          .map(data =>{
                            return data
                          })
  }

  campaignCredits(data){
    let path = 'campaign/credits'
    return this.apiService.post(path,data)
              .map(data =>{
                return data
              })
  }


}
