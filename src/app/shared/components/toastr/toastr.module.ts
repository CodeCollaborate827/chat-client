import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { NotifyToastrComponent } from "./components/notify-toastr/notify-toastr.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogService } from "../dialog/services";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    NotifyToastrComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    DialogService
  ]
})
export class ToastModule { }