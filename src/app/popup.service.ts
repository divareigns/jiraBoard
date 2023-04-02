import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private dialog: MatDialog,
  ) { }

  // openDialog(templateOrComponentRef: any, options: any): MatDialogRef<any> {
  //   return this.open(this.dialog, templateOrComponentRef, options);
  // }

  // private open(popupRef, templateOrComponentRef, options) {
  //   return popupRef.open(templateOrComponentRef, options);
  // }
}
