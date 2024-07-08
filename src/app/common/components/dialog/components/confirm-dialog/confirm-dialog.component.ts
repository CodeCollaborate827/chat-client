import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, job$: Observable<any>}
  ) { }
  
  onConfirm(): void {
    this.isLoading = true;
    this.data.job$
      .pipe(
        catchError((err) => {
          this.dialogRef.close(false);
          throw err;
        }),
        finalize(() => this.isLoading = false)
    )
      .subscribe((res) => { 
        this.dialogRef.close(true);
      })
  }

  onCancel(): void { 
    this.dialogRef.close(true);
  }
}
