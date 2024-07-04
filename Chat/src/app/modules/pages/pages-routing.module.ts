import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

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
        path: 'sample',
        component: HomeComponent
        // loadChildren: () => import('./sample').then((m) => m.SampleModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}