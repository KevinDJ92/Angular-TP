import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../Services/Login/export';

import { AuthService } from '../../AppConfig/Guards/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent 
// implements OnInit 
{
    model: any = {};
    loading = false;
    returnUrl: string;

	invalidCredentialMsg: string;    

    constructor(private authService: AuthService, private router: Router) {}
        
	loginForm = new FormGroup({
        nomUtilisateur: new FormControl(),
        motPasse: new FormControl()
     });

	onFormSubmit() {
        let uname = this.loginForm.get('nomUtilisateur').value;
        let pwd = this.loginForm.get('motPasse').value;
        
        this.authService.isUtilisateurAuthenticated2(uname, pwd).subscribe(
            authenticated => {
 
                if (authenticated) {
                   let url =  this.authService.getRedirectUrl(); 
                  
                   console.log(url);
                   console.log('Redirect Url:'+ url);
            //        this.router.navigate([ url ]);	
                   this.router.navigate([this.authService.getClientUrl()]);
                } 
                else {
                   this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
                }
            }
        );
     }


}