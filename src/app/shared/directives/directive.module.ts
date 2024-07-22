import { NgModule } from "@angular/core";
import { TrimDirective } from "./trim.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    TrimDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrimDirective
  ]
})
export class DirectiveModule {}