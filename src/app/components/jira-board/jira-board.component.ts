import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Jiracard } from 'src/app/models/Jiracard';
import { JiraList } from 'src/app/models/JiraList';
import { StorageService } from 'src/app/storage.service';
import { AddCardpopupComponent } from '../add-cardpopup/add-cardpopup.component';
import { AddListpopupComponent } from '../add-listpopup/add-listpopup.component';

@Component({
  selector: 'app-jira-board',
  templateUrl: './jira-board.component.html',
  styleUrls: ['./jira-board.component.css']
})
export class JiraBoardComponent implements OnInit {
  jiraBoardData: Array<JiraList> =[];

  constructor(private dialog: MatDialog,private storageService: StorageService){

  }

  ngOnInit(): void {
   this.getJiraBoardDetails();
  }


  getJiraBoardDetails()
  {
    this.jiraBoardData = this.storageService.getLists();
    this.jiraBoardData.map((element,index)=>{
      element.cards?.sort((a,b)=>{
        return (b.createdOn-a.createdOn);
      });
    });
    // console.log("load",this.jiraBoardData);
  }


  addList(){
    let listid:number = 0 ;
    let idarray:Array<number> = [];
    if(this.jiraBoardData !=null && this.jiraBoardData.length !=0)
    {
      this.jiraBoardData.forEach((element,index)=>{
        idarray.push(element.id);
      });
      listid = Math.max(...idarray) + 1;
    }
    let dialogref = this.dialog.open(AddListpopupComponent,{
      width:'450px',
      data:{
        Name: ""
      }
    });

    dialogref.afterClosed().subscribe((res)=>{
        if(res)
        {
          // let jiraBoard:Array<JiraList> = [];
          let newJiraList:JiraList = {
            id: listid,
            listName : res,
            cards : []
          };
          this.jiraBoardData.push(newJiraList);
          this.storageService.addLists(this.jiraBoardData);
          this.getJiraBoardDetails();
        }
    })
  }


  genartecardid(jiraList:JiraList)
  {
    let cardid:number = 0;
    let idarray:Array<number> =[]
    if(jiraList.cards?.length != 0)
    {
      jiraList.cards?.forEach((element,index)=>{
        idarray.push(element.id);
      });
      cardid = Math.max(...idarray) + 1;
    }
    return cardid;
  }

  addCard(jiraList:JiraList){

    let dialogref = this.dialog.open(AddCardpopupComponent,{
      width:'450px',
      data:{
        cardTitle:"",
        cardDesc:"",
        createdOn:"",
      }
    });


    dialogref.afterClosed().subscribe((data)=>{
      let card : Jiracard ={
        id: this.genartecardid(jiraList),
        cardTitle : data.cardTitle,
        cardDesc: data.cardDesc,
        createdOn: data.createdOn
      }
      this.jiraBoardData.forEach((element,index)=>{
        if(element.id == jiraList.id)
        {
          this.jiraBoardData[index].cards?.push(card);
        }
      });
      this.storageService.addLists(this.jiraBoardData);
      this.getJiraBoardDetails();
      // console.log("addedcard",this.jiraBoardData);
    })
  }

  deleteList(jiralist : JiraList)
  {
    let id = jiralist.id;
    this.jiraBoardData.forEach((element,index)=>{
      if(element.id == id)
      {
        this.jiraBoardData.splice(index,1);
      }
    });
    this.storageService.addLists(this.jiraBoardData);
    this.getJiraBoardDetails();
  }

  deletecard(jiralist: JiraList,jiracard :Jiracard)
  {
    let listid = jiralist.id;
    let cardid = jiracard.id;
    this.jiraBoardData.map((element,index)=>{
      if(element.id == listid)
      {
        element.cards?.forEach((e,i)=>{
          if(e.id == cardid)
          {
            element.cards?.splice(i,1);
          }
        });
      }
    });
    this.storageService.addLists(this.jiraBoardData);
    this.getJiraBoardDetails();
  }


  // dragleave(event:any)
  // {
  //   // console.log("event");
  // }


  drag(event:DragEvent,jiracard:Jiracard,jiralist:JiraList)
  {
    // console.log("drag",event,jiracard);
    event.dataTransfer?.setData("text/plain",JSON.stringify(jiracard))
    event.dataTransfer?.setData("application/json",JSON.stringify(jiralist.id));


  }


  // dragend(event:DragEvent,jiracard:Jiracard,jiralist:JiraList)
  // {
  //   // if(event.dataTransfer?.dropEffect != "none")
  //   // {
  //   //   console.log(true);
  //   // //   this.jiraBoardData.forEach((element,index)=>{
  //   // //   if(element.id == jiralist.id)
  //   // //   {
  //   // //     element.cards?.forEach((e,i)=>{
  //   // //       if(e.id == jiracard.id)
  //   // //       {
  //   // //         element.cards?.splice(i,1);
  //   // //       }
  //   // //     });
  //   // //   }
  //   // // });
  //   // }
  // }

  drop(event:DragEvent,jiralist:JiraList)
  {
    let data = event.dataTransfer?.getData("text/plain");
    if(data!=null){
      var jsoncarddata = JSON.parse(data);
    }
    var draggedlistid = event.dataTransfer?.getData("application/json");
    if(draggedlistid!=undefined)
    {
      var result = parseInt(draggedlistid);
    }

    if(draggedlistid!=undefined)
    {
      this.jiraBoardData.map((element,index)=>{
          if(element.id == result)
          {
            element.cards?.forEach((e,i)=>{
              if(e.id == jsoncarddata.id)
              {
                element.cards?.splice(i,1);
              }
            });
          }
        });
    }
    if(data!=null)
    {

      jsoncarddata.id = this.genartecardid(jiralist);
      this.jiraBoardData.forEach((element,index)=>{
        if(element.id == jiralist.id)
        {
          this.jiraBoardData[index].cards?.push(jsoncarddata);
        }
      });
      this.storageService.addLists(this.jiraBoardData);
      this.getJiraBoardDetails();
    }


    // console.log("drop",jsoncarddata);
    // console.log("droplist",jiralist);
  }
  allowdrop(event:any)
  {
    event.preventDefault();
  }

  getdate(timestamp:number)
  {
    let convertdate = new Date(timestamp);
    return convertdate.toLocaleString();
  }
}
