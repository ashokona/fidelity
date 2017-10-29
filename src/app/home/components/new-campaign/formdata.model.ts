export class FormData {
    title: string = '';
    type : string = '';
    campaignValidityFrom: Date = null;
    campaignValidityTo: Date = null;
    printingValidityFrom : Date = null;
    printingValidityTo : Date = null;
    publishingDate : Date = null;
    smsMessage: string = '';
    mailTitle : string = '';
    mailBody : number = null;
    cardsData : any = null;
    imageData : any = null;
 
    clear() {
        this.title = '';
        this.type = '';
        this.campaignValidityFrom = null;
        this.campaignValidityTo = null;
        this.printingValidityFrom = null;
        this.printingValidityTo = null;
        this.publishingDate = null;
        this.smsMessage = '';
        this.mailTitle  = '';
        this.mailBody = null;
        this.cardsData = null;
        this.imageData = null;
    }
}
 
export class campaignData {
    title: string = '';
    type : string = '';
    campaignValidityFrom: Date = null;
    campaignValidityTo : Date = null;
    printingValidityFrom : Date = null;
    printingValidityTo : Date = null;
    publishingDate : Date = null
    smsMessage : string = '';
    mailTitle : string = '';
    mailBody : number = null;
}
 
export class cardsImport {
    cardsData : any = null;
}

export class imageImport {
    imageData : any = null;
}