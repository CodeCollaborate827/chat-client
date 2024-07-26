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
  registerForm: FormGroup = new FormGroup({});

  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm && this.registerForm.invalid) {
      this.focusFirstInvalidControl();
      return;
    } 
    this.prepareData();
  }

  controlHasError(validation: string, controlName: string): boolean { 
    const control = this.registerForm?.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }

  private prepareData() {
    const loginData = this.registerForm.value;
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