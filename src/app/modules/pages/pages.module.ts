import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { TestComponent } from './test/test.component';
import { LayoutModule } from "../layout";

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule
  ],
})
export class PagesModule { }