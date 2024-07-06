import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent, NotifyDialogComponent } from "./components";

@NgModule({
  declarations: [
    NotifyDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class DialogModule { }