import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserRegister } from "../models";

@Injectable({
  providedIn: 'root',
})
export class AuthService { 
    authServiceApiUrl: string = environment.authServiceApiUrl;

    constructor(
        private http: HttpClient
    ) {}

    register(data: UserRegister): Observable<any> {
        return this.http.post(`${this.authServiceApiUrl}/auth/register`, data) 
    }
}