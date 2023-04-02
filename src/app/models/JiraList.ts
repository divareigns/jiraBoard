import { Jiracard } from "./Jiracard";

export class JiraList{
  public id:number;
  public listName: string  |null;
  public cards: Array<Jiracard> |null;

  constructor(JiraList:any ={})
  {
    this.id = JiraList.id || null;
    this.listName = JiraList.listName || null;
    this.cards = JiraList.cards || null;
  }
}
