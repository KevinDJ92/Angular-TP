import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../AppConfig/Guards/auth.service';
import { Utilisateur } from '../../Models/utilisateur';

@Component({
   selector: 'logout',	
   template: `<button input='input' (click)="logout()">Logout</button>`
})

export class LogoutComponent { 
    invalidCredentialMsg: string;
	loggedInUtilisateur: Utilisateur;
    constructor(private authService: AuthService, private router: Router) {
	}
    ngOnInit() {
       this.loggedInUtilisateur = this.authService.getLoggedInUtilisateur();
    }		
	logout() {
	   this.authService.logoutUtilisateur();
       this.router.navigate([ this.authService.getLoginUrl() ]);	
	}
}
    