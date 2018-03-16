export class File {
  public id: number
  public guid: string
  public image: any
  public uploaded: boolean
  public userConfirmed: boolean;
  public created: Date
  public type: string
  public caseId: number;

  constructor(img: any, type: string, caseId: number) {
    this.id = Math.round(Math.random());
    this.image = img;
    this.uploaded = false;
    this.created = new Date();
    this.userConfirmed = false;
    this.type = type;
    this.caseId = caseId;
    this.guid = "";
  }
}
