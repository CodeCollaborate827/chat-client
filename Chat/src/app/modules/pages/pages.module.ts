import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
})
export class PagesModule { }