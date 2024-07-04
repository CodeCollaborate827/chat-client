import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/pages').then(m => m.PagesModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth').then(m => m.AuthModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }