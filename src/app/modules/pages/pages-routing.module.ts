import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
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