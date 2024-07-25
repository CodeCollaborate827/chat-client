import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string | null = null;
  form: FormGroup = new FormGroup({});

  private readonly destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.form && this.form.invalid) {
      this.focusFirstInvalidControl();
      return;
    } 
    this.prepareData();
  }

  controlHasError(validation: string, controlName: string): boolean { 
    const control = this.form?.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }

  private prepareData() {
    const loginData = this.form.value;
    console.log(loginData);
  }

  private focusFirstInvalidControl() { 
    if (!this.form) return;
    this.form.markAllAsTouched();
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].invalid) {
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
