import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';


@Component({
  selector: 'app-add-listpopup',
  templateUrl: './add-listpopup.component.html',
  styleUrls: ['./add-listpopup.component.css']
})
export class AddListpopupComponent  {
  constructor(private  dialogRef:  MatDialogRef<AddListpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }

  exit()
  {
    this.dialogRef.close();
  }
}
