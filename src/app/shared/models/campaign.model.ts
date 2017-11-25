export class Campaign {
    idPremise ?: number;
    cdProduct: string;
    dsCampaign?: string;
    message: string;
    smsMessage: string;
    smsIdentity: string;
    mailSubject: string;
    mailBody: string;
    tsPublication: any;
    tsPrintingStart: any;
    tsPrintingEnd: any;
    tsValidStart: any;
    tsValidEnd: any;
    qtFreebee?: number;
    flExtra?: string;
    imageFileName ?: string;
    imageUrl?: string;
    campaignDetailsList?: {};

  constructor() {
    this.cdProduct = 'MS';
    this.dsCampaign = '';
    this.message = '';
    this.smsMessage = '';
    this.mailSubject = '';
    this.mailBody = '';
    this.tsPublication = '';
    this.tsPrintingStart = '';
    this.tsPrintingEnd = '';
    this.tsValidStart = '';
    this.tsValidEnd = '';
    this.smsIdentity = '';
    this.qtFreebee = 1;
  }
}
