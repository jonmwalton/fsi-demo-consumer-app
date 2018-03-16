import { Application } from './submission/application.model';
import { Product } from './product.model';


export class Case {
  public Application: Application = new Application();
  public caseId: number = null;
  public applicationType: string = "";
  public dateCreated: number = null;
  public applicantName: string = "";
  public currentTaskOwner: string = "";
  public currentTaskId: number = null;
  public currentTaskName: string = "";
  public currentTaskStatus: string = "";
  public productId: number = null;
  public userAlias: string = "";
  public pushAlias: string = "";
  public currentTaskForm: any = {};
  public additionalDocsRequired: boolean = false;
  public assignedTo: string = "Unassigned";
  public status: string = "Draft";
  public productObj: Product;
  public uploadedDocuments: any[] = [];
}
