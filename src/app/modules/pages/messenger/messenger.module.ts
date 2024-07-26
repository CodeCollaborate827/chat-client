import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessengerRoutingModule } from "./messenger-routing.module";
import { MessengerComponent } from './messenger.component';
import { ConversationComponent, ConversationSettingComponent, FriendListComponent, MessageComponent } from "./components";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogModule } from "src/app/shared/components/dialog";
import { ImageModule } from "src/app/shared/components/image";
import { PickerComponent, PickerModule } from '@ctrl/ngx-emoji-mart';
import { SharedModule } from "src/app/shared/shared.module";
import { UserAvatarModule } from "src/app/shared/components/user-avatar";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MessengerComponent,
    ConversationComponent,
    ConversationSettingComponent,
    FriendListComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessengerRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DialogModule,
    ImageModule,
    UserAvatarModule,
    PickerComponent,
    PickerModule,
    FormsModule
  ],
})
export class MessengerModule { }