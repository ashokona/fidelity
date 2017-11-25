import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardsComponent } from './components/cards/cards.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CampaignDataComponent } from './components/new-campaign/campaign-data/campaign-data.component';
import { CardsImportComponent } from './components/new-campaign/cards-import/cards-import.component';
import { ImageImportComponent } from './components/new-campaign/image-import/image-import.component';
import { SummarySubmissionComponent } from './components/new-campaign/summary-submission/summary-submission.component';
import { CampaignViewComponent } from './components/campaigns/campaign-view/campaign-view.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',redirectTo:'dashboard'},
      {path:'dashboard',component:DashboardComponent},
      {path:'cards',component:CardsComponent},
      {path:'campaigns',component:CampaignsComponent},
      {path:'viewcampaign',component:CampaignViewComponent},
      {
        path:'newcampaigns',
        component:NewCampaignComponent,
        children:[
          {path:'', redirectTo:'data'},
          {path:'data',component:CampaignDataComponent},
          {path:'cardimport',component:CardsImportComponent},
          {path:'imageimport',component:ImageImportComponent},
          {path:'summary',component:SummarySubmissionComponent},
        ]
      },
      {path:'settings',component:SettingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
