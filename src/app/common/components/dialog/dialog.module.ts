import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, NotifyDialogComponent } from "./components";
import { DialogService } from "./services";

@NgModule({
  declarations: [
    NotifyDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    DialogService
  ]
})
export class DialogModule { }