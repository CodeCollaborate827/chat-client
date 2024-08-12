import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm?: FormGroup;
  showPassword?: boolean = false;
  loginData: UserLogin = {} as UserLogin;

  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.loginForm && this.loginForm.invalid) {
      this.focusFirstInvalidControl();
      return;
    } 
    this.prepareData();
    this.authService.login(this.loginData).subscribe((res) => console.log(res))
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }

  controlHasError(validation: string, controlName: string): boolean { 
    const control = this.loginForm?.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }

  loginWithGoogle() {
  }

  loginWithFacebook() {
  }

  private prepareData() {
    const loginData = this.loginForm?.value;
    console.log(loginData);
  }

  private focusFirstInvalidControl() { 
    if (!this.loginForm) return;
    this.loginForm.markAllAsTouched();
    for (const key of Object.keys(this.loginForm.controls)) {
      if (this.loginForm.controls[key].invalid) {
        setTimeout(() => { 
          const invalidControl = this.elementRef.nativeElement.querySelector(['[formControlName="' + key + '"]']);
          if (!invalidControl) return;
          invalidControl.focus();
        }, 100);
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
