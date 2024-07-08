import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { AsideComponent, FooterComponent } from "./components";

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }