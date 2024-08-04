import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator, passwordValidator } from 'src/app/shared/validators/password.validator';
import { vietnamCities } from "../../../../shared/helpers/masterData"
import { UserRegister } from '../../models';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  error: string | null = null;
  registerForm?: FormGroup;
  registerStep1Form: FormGroup = new FormGroup({});
  registerStep2Form: FormGroup = new FormGroup({});
  registerStep3Form: FormGroup = new FormGroup({});
  showPassword?: boolean = false;
  showConfirmPassword?: boolean = false;
  registerData: UserRegister = {} as UserRegister;
  cities = vietnamCities;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      city: [],
      avatar: [],
      dateOfBirth: []
    });

    this.registerStep1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, passwordValidator])],
      confirmPassword: ['', Validators.compose([Validators.required, confirmPasswordValidator])],
    })
    this.registerStep2Form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      displayName: ['', [Validators.required, Validators.minLength(4)]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })
    this.registerStep3Form = this.fb.group({})
    this.registerStep1Form.get('password')?.valueChanges.subscribe(() => {
      this.registerStep1Form.get('confirmPassword')?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
    })
    this.registerStep1Form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registerStep1Form.get('password')?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
    })
  }

  onClickNextStep(step: number) {
    if (step == 1) {
      this.registerStep1Form.markAllAsTouched()
      if (this.registerStep1Form && this.registerStep1Form.invalid) {
        return;
      }
    } else if (step == 2) {
      this.registerStep2Form.markAllAsTouched()
      if (this.registerStep2Form && this.registerStep2Form.invalid) {
        return;
      }
    }
  }

  onSubmit() {
    console.log(this.registerStep1Form)
    if (this.registerForm && this.registerForm.invalid) {
      this.focusFirstInvalidControl();
      return;
    } 
    this.prepareData();
    this.authService.register(this.registerData).subscribe((res) => console.log(res))
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSearchCity(event: any) {
    const value = event.target.value;
    console.log(value)
    this.cities = this.cities.filter(city => city.toLowerCase().includes(value.toLowerCase()));
    console.log(this.cities)
  }

  controlHasError(form: FormGroup, validation: string, controlName: string): boolean { 
    const control = form.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }
  
  private prepareData() {
    this.registerData = {
      email: this.registerStep1Form.get('email')?.value,
      password: this.registerStep1Form.get('password')?.value,
      username: this.registerStep2Form.get('username')?.value,
      displayName: this.registerStep2Form.get('displayName')?.value,
      dateOfBirth: this.registerStep2Form.get('dateOfBirth')?.value,
      city: this.registerStep2Form.get('city')?.value,
      avatar: this.registerStep3Form.get('avatar')?.value ?? ''
    }
  }

  private focusFirstInvalidControl() { 
    if (!this.registerForm) return;
    this.registerForm.markAllAsTouched();
    for (const key of Object.keys(this.registerForm.controls)) {
      if (this.registerForm.controls[key].invalid) {
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