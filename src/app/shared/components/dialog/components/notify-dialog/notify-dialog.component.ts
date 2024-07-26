import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<NotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string}
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
