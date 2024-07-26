import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(@Inject(ToastrService) private toastr: ToastrService) { }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Warning');
  }

  showInfo(message: string): void {
    this.toastr.info(message, 'Info');
  }
}
