import { inject } from "@angular/core"
import { AuthService } from "./services/auth.service"
import { Router } from "@angular/router";

export const isLoggedIn = () : boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // return true;
    if(authService.isLoggedIn) {
        return true;
    } else {
        router.navigateByUrl('/signin');
        return false;
    }
}