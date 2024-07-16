import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessengerRoutingModule } from "./messenger-routing.module";
import { MessengerComponent } from './messenger.component';
import { ConversationComponent, ConversationSettingComponent, FriendListComponent } from "./components";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { DialogModule } from "src/app/common/components/dialog";

@NgModule({
  declarations: [
    MessengerComponent,
    ConversationComponent,
    ConversationSettingComponent,
    FriendListComponent
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DialogModule
  ],
})
export class MessengerModule { }