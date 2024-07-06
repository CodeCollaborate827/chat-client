import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'test',
        loadChildren: () => import('./test').then((m) => m.TestModule),
      },
      {
        path: 'messenger',
        loadChildren: () => import('./messenger').then((m) => m.MessengerModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}