import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.registerStep2Form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      displayName: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.registerStep3Form = this.fb.group({})
  }

  onSubmit() {
    console.log(this.registerStep1Form)
    if (this.registerForm && this.registerForm.invalid) {
      this.focusFirstInvalidControl();
      return;
    } 
    this.prepareData();
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
    const loginData = this.registerForm?.value;
    console.log(loginData);
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