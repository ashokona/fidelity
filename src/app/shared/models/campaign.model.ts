export class Campaign {
    idPremise ?: number;
    cdProduct: string;
    dsCampaign?: string;
    message: string;
    smsMessage: string;
    mailSubject: string;
    mailBody: string;
    tsPublication: any;         
    tsPrintingStart: any;
    tsPrintingEnd: any;
    tsValidStart: any;
    tsValidEnd: any;
    qtFreebee?: number;
    flExtra?: string;
    smsIdentity ?: string;
    imageFileName ?: string;
    imageUrl?: string;
    campaignDetailsList? : {}
}