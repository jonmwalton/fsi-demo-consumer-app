export class ProductSubmission {
  public personal: any;
  public financial: any;
  public mortgage: any;
  public employment: any;
  public files: any[]

  constructor(
    public useProfileData: boolean,
    public product: any,
    public productType: string,
    public productName: string,
  ) {
    this.personal = {};
    this.financial = {};
    this.mortgage = {};
    this.employment = {};
    this.files = [];
  }
}
