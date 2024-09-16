import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginRequest, LoginResponse, RegisterRequest, UserProfileResponse } from "../models";
import { User } from "src/app/shared";

@Injectable({
  providedIn: 'root',
})
export class AuthService { 
    authServiceApiUrl: string = environment.authServiceApiUrl;
    userServiceApiUrl: string = environment.userServiceApiUrl;

    private currentUserSubject = new BehaviorSubject<User>({} as User);
    private accessTokenSubject = new BehaviorSubject<string>("");
    private refreshTokenSubject = new BehaviorSubject<string>("");
    currentUser$ = this.currentUserSubject.asObservable();
    accessToken$ = this.accessTokenSubject.asObservable();
    refreshToken$ = this.refreshTokenSubject.asObservable();

    constructor(
        private http: HttpClient 
    ) {}

    get currentUserValue() {
        return this.currentUserSubject.value;
    }

    get accessTokenValue() {
        return this.accessTokenSubject.value;
    }

    get refreshTokenValue() {
        return this.refreshTokenSubject.value;
    }
 
    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.authServiceApiUrl}/auth/register`, data);
    }

    login(data: LoginRequest): Observable<any> {
        return this.http.post(`${this.authServiceApiUrl}/auth/login`, data)
        .pipe(
            tap((response: LoginResponse) => {
                this.setAccessToken(response.data?.accessToken);
                this.setRefreshToken(response.data?.refreshToken);
            }),
            switchMap(() => this.getUserProfile()
                .pipe(
                    tap((response: UserProfileResponse) => {
                        this.setCurrentUser(response.data);
                    })
                )
            ) 
        );
        ;
    }

    getUserProfile(): Observable<UserProfileResponse> {
        return this.http.get(`${this.userServiceApiUrl}/user/profile`)
    }
    
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.currentUserSubject.next({} as User);
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