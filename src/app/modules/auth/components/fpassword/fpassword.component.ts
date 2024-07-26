import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent, NotifyDialogComponent } from 'src/app/shared/components/dialog/components';

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.scss']
})
export class FpasswordComponent implements OnInit, OnDestroy {
  error: string | null = null;
  form: FormGroup = new FormGroup({});

  private readonly destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder,
    private elementRef: ElementRef, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form && this.form.invalid) {
      this.focusFirstInvalidControl();
      return;
    }
    this.prepareData();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed the action');
      } else {
        console.log('User canceled the action');
      }
    });
  }

  openNotifyDialog(): void {
    this.dialog.open(NotifyDialogComponent, {
      data: {
        title: 'Notification',
        message: 'Reset password link has been sent to your email.'
      }
    });
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

  controlHasError(validation: string, controlName: string): boolean {
    const control = this.form?.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }
  
}
