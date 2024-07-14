import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { AsideComponent, FooterComponent } from "./components";
import { MatTabsModule } from '@angular/material/tabs';
import { MessengerComponent } from "../pages/messenger/messenger.component";
import { PagesComponent } from "../pages/pages.component";

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }