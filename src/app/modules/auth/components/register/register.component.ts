import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { AuthService } from '../../services';
import {
  confirmPasswordValidator,
  passwordValidator,
} from 'src/app/shared/validators/password.validator';
import { vietnamCities } from '../../../../shared/helpers/masterData';
import { RegisterRequest } from '../../models';
import { VerifyEmailEnum } from '../../enums';
import { APIResponse, NoDataAPIResponse } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  error: string | null = null;
  registerStep1Form: FormGroup = new FormGroup({});
  registerStep2Form: FormGroup = new FormGroup({});
  registerStep3Form: FormGroup = new FormGroup({});
  otp: string[] = new Array(6).fill('');
  otpArray = new Array(6);
  countdown = {
    minutes: 1,
    seconds: 0,
  };

  showPassword?: boolean = false;
  showConfirmPassword?: boolean = false;
  isEditableStep: boolean = false;
  verifyRegistration: boolean = false;
  resendOTP: boolean = false;
  isCounting: boolean = false;
  intervalId: any;

  registerData: RegisterRequest = {} as RegisterRequest;
  cities = vietnamCities;

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerStep1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, passwordValidator])],
      confirmPassword: ['', Validators.compose([Validators.required, confirmPasswordValidator]),],
    });
    this.registerStep2Form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['male', [Validators.required]],
      displayName: ['', [Validators.required, Validators.minLength(4)]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
    this.registerStep3Form = this.fb.group({});
    this.registerStep1Form.get('password')?.valueChanges.subscribe(() => {
      this.registerStep1Form
        .get('confirmPassword')
        ?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
    });
    this.registerStep1Form
      .get('confirmPassword')
      ?.valueChanges.subscribe(() => {
        this.registerStep1Form
          .get('password')
          ?.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      });
  }

  onClickNextStep(step: number) {
    if (step == 1) {
      this.registerStep1Form.markAllAsTouched();
      if (this.registerStep1Form && this.registerStep1Form.invalid) {
        return;
      } else {
      }
    } else if (step == 2) {
      this.registerStep2Form.markAllAsTouched();
      if (this.registerStep2Form && this.registerStep2Form.invalid) {
        return;
      }
    }
  }

  onSubmitRegister() {
    this.prepareData();
    this.authService
      .register(this.registerData)
      .pipe((finalize(() => this.verifyRegistration = true)))
      .subscribe((res) => console.log(res));
  }

  toggleVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleVisibilityConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onOtpInputChange(event: any, index: number): void {
    const input = event.target;
    if (input.value.length === 1 && index < this.otp.length - 1) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (event.inputType === 'deleteContentBackward' && index > 0) {
      const previousInput = input.previousElementSibling;
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  verifyOtp(): void {
    const verificationCode = this.otp.join('');
    this.loadingSubject.next(false);
    this.authService
      .verifyEmailForRegistration({
        email: this.registerStep1Form.get('email')?.value,
        verificationCode,
        type: VerifyEmailEnum.AccountRegistration,
      })
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe();
  }

  resendVerificationEmail() {
    if (this.isCounting) return;
    this.loadingSubject.next(false);
    this.authService
      .resendVerifyEmailForRegistration({
        email:
          this.registerStep1Form.get('email')?.value || 'xemesis1234@gmail.com',
        type: VerifyEmailEnum.AccountRegistration,
      })
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((res: NoDataAPIResponse) => {
        if (!res.errorCode) {
          this.resendOTP = true;
          this.startCountdown();
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

  private prepareData() {
    this.registerData = {
      email: this.registerStep1Form.get('email')?.value,
      password: this.registerStep1Form.get('password')?.value,
      username: this.registerStep2Form.get('username')?.value,
      displayName: this.registerStep2Form.get('displayName')?.value,
      dateOfBirth: this.registerStep2Form.get('dateOfBirth')?.value,
      gender: this.registerStep2Form.get('gender')?.value,
      city: this.registerStep2Form.get('city')?.value,
      avatar: this.registerStep3Form.get('avatar')?.value ?? '',
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
