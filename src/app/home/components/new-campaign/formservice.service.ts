import { Injectable } from '@angular/core';

import { FormData, campaignData, cardsImport, imageImport } from './formdata.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private iscampaignDataFormValid: boolean = false;
    private iscardsImportFormValid: boolean = false;
    private isimageImportFormValid: boolean = false;

    getcampaignData(): campaignData {
        // Return the Personal data
        var campaign: campaignData = {
            title: this.formData.title,
            type: this.formData.type,
            campaignValidityFrom: this.formData.campaignValidityFrom,
            campaignValidityTo: this.formData.campaignValidityTo,
            printingValidityFrom: this.formData.printingValidityFrom,
            printingValidityTo: this.formData.printingValidityTo,
            publishingDate: this.formData.publishingDate,
            smsMessage: this.formData.smsMessage,
            mailTitle: this.formData.mailTitle,
            mailBody: this.formData.mailBody
        };
        return campaign;
    }

    setcampaignData(data: campaignData) {
        // Update the Personal data only when the Personal Form had been validated successfully

        this.iscampaignDataFormValid = true;
        this.formData.title = data.title;
        this.formData.type = data.type;
        this.formData.campaignValidityFrom = data.campaignValidityFrom;
        this.formData.campaignValidityTo = data.campaignValidityTo;
        this.formData.printingValidityFrom = data.printingValidityFrom;
        this.formData.printingValidityTo = data.printingValidityTo;
        this.formData.publishingDate = data.publishingDate;
        this.formData.smsMessage = data.smsMessage;
        this.formData.mailTitle = data.mailTitle;
        this.formData.mailBody = data.mailBody;
        
    }

    getcardsImport(): cardsImport {
        // Return the work type
        var cards : cardsImport = {
            cardsData : this.formData.cardsData
        }
        return cards;
    }

    setcardsImport(data: cardsImport) {
        // Update the work type only when the Work Form had been validated successfully
        this.iscardsImportFormValid = true;
        this.formData.cardsData = data.cardsData;
    }

    getimageImport(): imageImport {
        // Return the Address data
        var image : imageImport = {
            imageData: this.formData.imageData
        };
        return image;
    }

    setimageImport(data: imageImport) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isimageImportFormValid = true;
        this.formData.imageData = data.imageData;
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.iscampaignDataFormValid = this.iscardsImportFormValid = this.isimageImportFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.iscampaignDataFormValid &&
            this.iscardsImportFormValid &&
            this.isimageImportFormValid;
    }
}