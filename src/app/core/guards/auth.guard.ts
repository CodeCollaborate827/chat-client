import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { User } from "src/app/modules/pages/user/models";

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);

    return authService.currentUser$.pipe(
        map((user: User) => {
            if (!user) return false;
            else return true;
        })
    )
}