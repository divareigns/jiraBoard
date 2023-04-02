import { Injectable } from '@angular/core';
import { JiraList } from './models/JiraList';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addLists(lists:Array<JiraList>)
  {
    // console.log(lists);
    let data = JSON.stringify(lists);
    localStorage.setItem("jiraboard",data);
  }

  getLists()
  {
    let result;
    let data =localStorage.getItem("jiraboard");
    if(data!=null)
    {
       result = JSON.parse(data);
    }
    else{
      result = [];
    }
    return result;
  }




}
