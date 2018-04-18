import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../Services/Login/export';
import { UtilisateurService } from '../../Services/Utilisateur/utilisateur.service';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private utilisateurService: UtilisateurService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.utilisateurService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
