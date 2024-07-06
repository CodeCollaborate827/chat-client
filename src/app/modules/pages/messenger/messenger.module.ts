import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessengerRoutingModule } from "./messenger-routing.module";
import { MessengerComponent } from './messenger.component';
import { ConversationComponent, ConversationSettingComponent, FriendListComponent } from "./components";

@NgModule({
  declarations: [
    MessengerComponent,
    ConversationComponent,
    ConversationSettingComponent,
    FriendListComponent
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule
  ],
})
export class MessengerModule { }