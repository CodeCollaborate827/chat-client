import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FpasswordComponent } from "./components/fpassword/fpassword.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    FpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class AuthModule {}