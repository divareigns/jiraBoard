import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cardpopup',
  templateUrl: './add-cardpopup.component.html',
  styleUrls: ['./add-cardpopup.component.css']
})
export class AddCardpopupComponent {

  constructor(private  dialogRef:  MatDialogRef<AddCardpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }

  sendData(){
    this.data.createdOn = Date.now();
  }
  exit()
  {
    this.dialogRef.close();
  }
}
