import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserProfileResponse } from "../models/user-profile.model";
import { User } from "../models";
import { APIResponse, NoDataAPIResponse, PaginationParams } from "src/app/shared";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userServiceApiUrl: string = environment.userServiceApiUrl;

    constructor(private http: HttpClient) {}

    getUserProfile(): Observable<APIResponse<User>> {
        return this.http.get(`${this.userServiceApiUrl}/user/profile`);
    }

    updateUserProfile(data: User): Observable<NoDataAPIResponse> {
        return this.http.put(`${this.userServiceApiUrl}/user/profile`, data);
    }

    getFriendList(params: PaginationParams = { currentPage: 1, pageSize: 10 }): Observable<APIResponse<User[]>> {
        return this.http.get(`${this.userServiceApiUrl}/user/friends?currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
    }

    getFriendRequestList(params: PaginationParams = { currentPage: 1, pageSize: 10 }): Observable<APIResponse<User[]>> {
        return this.http.get(`${this.userServiceApiUrl}/user/friends/friend-requests?currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
    }

    acceptFriendRequest(data: any): Observable<NoDataAPIResponse> {
        return this.http.post(`${this.userServiceApiUrl}/user/friends/accept-friend-request`, data);
    }

    denyFriendRequest(data: any): Observable<NoDataAPIResponse> {
        return this.http.post(`${this.userServiceApiUrl}/user/friends/deny-friend-request`, data);
    }

    addFriend(data: any): Observable<NoDataAPIResponse> {
        return this.http.post(`${this.userServiceApiUrl}/user/friends/add-friend`, data);
    }
}