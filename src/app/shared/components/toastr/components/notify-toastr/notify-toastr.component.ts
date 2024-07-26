import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notify-toastr',
  templateUrl: './notify-toastr.component.html',
  styleUrls: ['./notify-toastr.component.scss']
})

export class NotifyToastrComponent {
  constructor(
    private dialogRef: MatDialogRef<NotifyToastrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, job$: Observable<any> },
    private notificationService: NotificationService
  ) { }

  confirm() {
    this.data.job$.subscribe({
      next: () => {
        this.notificationService.showSuccess('Job completed successfully');
        this.dialogRef.close(true);
      },
      error: () => {
        this.notificationService.showError('Job failed');
        this.dialogRef.close(false);
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
