export class Jiracard{
  public id:number;
  public cardTitle:string;
  public cardDesc:string;
  public createdOn: number;

  constructor(Jiracard:any ={})
  {
    this.id = Jiracard.id || null;
    this.cardTitle = Jiracard.cardTitle || null;
    this.cardDesc = Jiracard.cardDesc || null;
    this.createdOn = Jiracard.createdOn || null;
  }
}
