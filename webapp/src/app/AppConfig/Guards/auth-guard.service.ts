import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log('Url:' + url);

        if (this.authService.isUtilisateurLoggedIn()) {
            console.log('isUtilisateurLoggedIn is true'); 
            this.authService.setRedirectUrl(url);
            // this.router.navigate([this.authService.getAdminUrl()]);
            return true;
        }

        this.authService.setRedirectUrl(url);
        this.router.navigate([this.authService.getLoginUrl()]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('ENTERED: canActivateChild');        
        let url: string = state.url;
        console.log('Url:' + url);

        let loggedInUtilisateur = this.authService.getLoggedInUtilisateur();

        console.log("loggedInUtilisateur: " + loggedInUtilisateur.droitUtilisation);

        if (loggedInUtilisateur.droitUtilisation) {
            this.authService.setRedirectUrl(url);
            this.router.navigate([this.authService.getAdminUrl()]);
            return true;
        } 
        else {
            console.log('Unauthorized to open link: ' + state.url);
            return false;
        }
    }
}