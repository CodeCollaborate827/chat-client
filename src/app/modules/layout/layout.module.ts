import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { AsideComponent, FooterComponent } from "./components";
import { MatTabsModule } from '@angular/material/tabs';
import { MessengerComponent } from "../pages/messenger/messenger.component";
import { PagesComponent } from "../pages/pages.component";
import { MatIconModule } from "@angular/material/icon";
import { UserAvatarModule } from "../../shared/components/user-avatar/user-avatar.module";
import { AuthRoutingModule } from "../auth/auth-routing.module";
import { PagesRoutingModule } from "../pages/pages-routing.module";

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    UserAvatarModule,
    PagesRoutingModule
],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }