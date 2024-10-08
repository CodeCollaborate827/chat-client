import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TestComponent } from "./test.component";

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}