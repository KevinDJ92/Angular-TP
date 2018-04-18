import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Utilisateur } from '../../Models/utilisateur';

@Injectable()
export class AuthService { 
	constructor(private http: Http) { }
	host = "http://localhost:8080";
	sendUtilisateurPath = "/utilisateurs/auth-utilisateur";

	// URLS
	private redirectUrl: string = '/';
	private adminUrl: string = '/admin';
	private clientUrl: string = '/client';
	private produitUrl: string = '/produit';
	private loginUrl: string = '/login';

	private isloggedIn: boolean = false;
	private loggedInUtilisateur: Utilisateur;
	
	isUtilisateurAuthenticated2(nomUtilisateur: string, motPasse:string): Observable<boolean> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		
		return this.http.post(this.host + this.sendUtilisateurPath,
			JSON.stringify({ "nomUtilisateur": nomUtilisateur, "motPasse": motPasse })
			, options).map((response: Response) => {
			let utilisateur = response.json();

				if (utilisateur) {
					this.isloggedIn = true;
					this.loggedInUtilisateur = utilisateur;
				}
				else {
					this.isloggedIn = false;
				}
				return this.isloggedIn;
			});
	}
	
	isUtilisateurLoggedIn(): boolean {
		return this.isloggedIn;
	}

	getRedirectUrl(): string {
		console.log("Redirect Called");
		return this.redirectUrl;
	}

	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}

	getLoginUrl(): string {
		return this.loginUrl;
	}

	getAdminUrl(): string {
		return this.adminUrl;
	}

	getClientUrl(): string {
		return this.clientUrl;
	}

	getProduitUrl(): string {
		return this.produitUrl;
	}
	
	getLoggedInUtilisateur(): Utilisateur {
		return this.loggedInUtilisateur;
	}
	
	logoutUtilisateur(): void{
		this.isloggedIn = false;
	}
}