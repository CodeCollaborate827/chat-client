import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserProfileResponse,
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  ResendVerifyEmailRequest,
  ResendVerifyEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '../models';
import { VerifyResetPasswordResponse } from '../models/verify-email.model';
import { User } from '../../pages/user/models';
import { UserService } from '../../pages/user/services';
import { APIResponse } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authServiceApiUrl: string = environment.authServiceApiUrl;
  userServiceApiUrl: string = environment.userServiceApiUrl;

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private accessTokenSubject = new BehaviorSubject<string>('');
  private refreshTokenSubject = new BehaviorSubject<string>('');
  currentUser$ = this.currentUserSubject.asObservable();
  accessToken$ = this.accessTokenSubject.asObservable();
  refreshToken$ = this.refreshTokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get accessTokenValue(): string {
    return this.accessTokenSubject.value;
  }

  get refreshTokenValue(): string {
    return this.refreshTokenSubject.value;
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.authServiceApiUrl}/auth/register`, data);
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.authServiceApiUrl}/auth/login`, data).pipe(
      tap((response: LoginResponse) => {
        this.setAccessToken(response.data?.accessToken);
        this.setRefreshToken(response.data?.refreshToken);
      }),
      switchMap(() =>
        this.userService.getUserProfile().pipe(
          tap((response: APIResponse<User>) => {
            this.setCurrentUser(response.data);
          })
        )
      )
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next({} as User);
  }

  verifyEmailForRegistration(data: VerifyEmailRequest): Observable<VerifyEmailResponse> {
    return this.http.post(`${this.authServiceApiUrl}/auth/verify-email`, data);
  }

  resendVerifyEmailForRegistration(data: ResendVerifyEmailRequest): Observable<ResendVerifyEmailResponse> {
    return this.http.post(`${this.authServiceApiUrl}/auth/resend-verification-email`, data);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.authServiceApiUrl}/auth/forgot-password`, data);
  }

  verifyEmailForResetPass(data: VerifyEmailRequest): Observable<VerifyResetPasswordResponse> {
    return this.http.post(`${this.authServiceApiUrl}/auth/verify-email`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.authServiceApiUrl}/auth/reset-password`, data);
  }

  private setCurrentUser(user: User | undefined) {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private setAccessToken(token: string | undefined) {
    if (!token) return;
    localStorage.setItem('accessToken', JSON.stringify(token));
    this.accessTokenSubject.next(token);
  }

  private setRefreshToken(token: string | undefined) {
    if (!token) return;
    localStorage.setItem('refreshToken', JSON.stringify(token));
    this.refreshTokenSubject.next(token);
  }
}
