import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserAvatarComponent } from "./components";

@NgModule({
  declarations: [
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UserAvatarComponent
  ]
})
export class UserAvatarModule { }