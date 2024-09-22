import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, Observable, Subject, tap } from 'rxjs';
import { AuthService } from '../../services';
import { ForgotPassStep, VerifyEmailEnum } from '../../enums';
import { confirmPasswordValidator, passwordValidator } from 'src/app/shared/validators/password.validator';
import { NoDataAPIResponse } from 'src/app/shared';
import { VerifyResetPasswordResponse } from '../../models';

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.scss']
})
export class FpasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup = new FormGroup({});
  resetPasswordForm: FormGroup = new FormGroup({});
  step: number = ForgotPassStep.Email;
  otp: string[] = new Array(6).fill('');
  otpArray = new Array(6);
  countdown = {
    minutes: 1,
    seconds: 0,
  };
  resetPasswordToken: string = "";
  intervalId: any;

  showPassword?: boolean = false;
  showConfirmPassword?: boolean = false;
  resendOTP: boolean = false;
  isCounting: boolean = false;

  private readonly destroy$ = new Subject();
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  get ForgotPasswordStep() {
    return ForgotPassStep;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', Validators.compose([Validators.required, confirmPasswordValidator]),],
    })
  }

  onClickCancel() {
    this.router.navigate(["/auth/login"]);
  }

  onSubmitForgotPassword() {
    this.forgotPasswordForm.markAllAsTouched();
    if (this.forgotPasswordForm && this.forgotPasswordForm.invalid) {
      return;
    }
    const email = this.forgotPasswordForm.get("email")?.value;
    this.authService.forgotPassword({ email }).subscribe((res: NoDataAPIResponse) => {
      if (!res.errorCode) {
        this.step = ForgotPassStep.OTP;
      }
    });
  }

  onOtpInputChange(event: any, index: number): void {
    const input = event.target;
    if (input.value.length === 1 && index < this.otp.length - 1) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (event.inputType === 'deleteContentBackward' || event.key === 'Backspace') {
      if (index > 0) {
        const previousInput = input.previousElementSibling;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  }

  resendVerificationEmail() {
    if (this.isCounting) return;
    this.loadingSubject.next(false);
    this.authService
      .resendVerifyEmailForRegistration({
        email:
          this.forgotPasswordForm.get('email')?.value,
        type: VerifyEmailEnum.ForgotPassword,
      })
      .pipe(
        tap(() => {
          this.resendOTP = true;
          this.startCountdown();
        }),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((res: NoDataAPIResponse) => {
        if (!res.errorCode) {
        }
      });
  }

  verifyOtp(): void {
    const verificationCode = this.otp.join('');
    this.loadingSubject.next(false);
    this.authService
      .verifyEmailForRegistration({
        email: this.forgotPasswordForm.get('email')?.value,
        verificationCode,
        type: VerifyEmailEnum.ForgotPassword,
      })
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res: VerifyResetPasswordResponse) => {
        if (res.data?.tokens && res.data.tokens.resetPasswordToken) {
          this.resetPasswordToken = res.data.tokens.resetPasswordToken;
        }
        if (!res.errorCode) {
          this.step = ForgotPassStep.ResetPass;
        }
      });
  }

  startCountdown(): void {
    if (this.isCounting) return;

    this.isCounting = true;
    let time = this.countdown.minutes * 60 + this.countdown.seconds;

    this.intervalId = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      this.countdown.minutes = minutes;
      this.countdown.seconds = seconds;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.isCounting = false;
      }

      time--;
    }, 1000);
  }

  onSubmitResetPassword() {
    if (this.resetPasswordForm && this.resetPasswordForm.invalid) {
      return;
    }
    const newPassword = this.resetPasswordForm.get("newPassword")?.value;
    this.authService.resetPassword({ 
      newPassword, 
      resetPasswordToken: this.resetPasswordToken
    }).subscribe((res: NoDataAPIResponse) => {
      if (!res.errorCode)
        this.step = ForgotPassStep.Completion;
    });
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // private focusFirstInvalidControl() { 
  //   if (!this.form) return;
  //   this.form.markAllAsTouched();
  //   for (const key of Object.keys(this.form.controls)) {
  //     if (this.form.controls[key].invalid) {
  //       setTimeout(() => { 
  //         const invalidControl = this.elementRef.nativeElement.querySelector(['[formControlName="' + key + '"]']);
  //         if (!invalidControl) return;
  //         invalidControl.focus();
  //       }, 100);
  //       break;
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  controlHasError(
    form: FormGroup,
    validation: string,
    controlName: string
  ): boolean {
    const control = form.controls[controlName];
    if (!control) return false;
    const errors = control.errors;
    if (!errors) return false;
    const keys = Object.keys(errors);
    return keys[0] === validation && (control.dirty || control.touched);
  }
  
}
