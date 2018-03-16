import { Personal } from './personal.model';
import { Financial } from './financial.model';
import { File } from './file.model';
import { Credit } from './credit.model';
import { Mortgage } from './mortgage.model';
import { Employment } from './employment.model';

interface CompanyDetails {
  companyName: string
  tradingYears: string
  dunsNumber: string
}

export class Application {
  public personalDetails: Personal = new Personal();
  public financialInformation: Financial = new Financial();
  public employmentDetails: Employment[] = [new Employment()];
  public mortgageDetails: Mortgage = new Mortgage();
  public creditDetails: Credit = new Credit();
  public companyDetails: CompanyDetails = this.setCompantDetails();
  public productId: number;
  public files: File[] = [];
  public applicationType: string;
  public productObj: any;
  public useProfileData: boolean = false;
  public productType: string = "";
  public productName: string = "";

  private setCompantDetails(): CompanyDetails {
    return {
      companyName: "RedHat",
      tradingYears: "5",
      dunsNumber: "123123123"
    }
  }
}
