import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { HomeService } from '../shared/services/home.service';
import { MultiStepService } from '../shared/services/multi-step.service';
import { FormDataService } from './components/new-campaign/formservice.service';
import { SimpleNotificationsModule } from 'angular2-notifications-lite';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { FileUploadModule } from "ng2-file-upload";
import { DateFormatPipe } from '../shared/pipes/date.pipe'
import { LoadersCssModule } from 'angular2-loaders-css';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CardsComponent } from './components/cards/cards.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TableCheckBoxComponent } from './components/cards/table-check-box/table-check-box.component';
import { CampaignDataComponent } from './components/new-campaign/campaign-data/campaign-data.component';
import { CardsImportComponent } from './components/new-campaign/cards-import/cards-import.component';
import { ImageImportComponent } from './components/new-campaign/image-import/image-import.component';
import { SummarySubmissionComponent } from './components/new-campaign/summary-submission/summary-submission.component';
import { CampaignViewComponent } from './components/campaigns/campaign-view/campaign-view.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    FormsModule,
    Ng2SmartTableModule,
    MultiselectDropdownModule,
    SharedModule,
    MatDialogModule,
    ConfirmDialogModule,
    DialogModule,
    SimpleNotificationsModule,
    DateTimePickerModule,
    FileUploadModule,
    LoadersCssModule
  ],
  declarations: [
    HomeComponent,
    TopNavComponent, 
    FooterComponent,
    DashboardComponent, 
    DateFormatPipe,
    SideNavComponent, CardsComponent, CampaignsComponent, NewCampaignComponent, SettingsComponent, TableCheckBoxComponent, CampaignDataComponent, CardsImportComponent, ImageImportComponent, SummarySubmissionComponent, CampaignViewComponent
  ],
  providers: [
    HomeService,
    ConfirmationService,
    MultiStepService,
    FormDataService
  ],
  entryComponents: [ TableCheckBoxComponent ]
})
export class HomeModule { }
