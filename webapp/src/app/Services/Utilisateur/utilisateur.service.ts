import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Utilisateur } from '../../Models/utilisateur';

@Injectable()
export class UtilisateurService {
    constructor(private http: Http) { }

    host = "http://localhost:8080";
    getAllUtilisateursPath = "/utilisateurs/all-utilisateurs";
    getUtilisateurByIdPath = "/utilisateurs/utilisateur/";
    addUtilisateurPath = "/utilisateurs/add-utilisateur";

    updateUtilisateurPath = "/utilisateurs/update-utilisateur";
    deleteUtilisateurPath = "/utilisateurs/delete-utilisateur";

    getAll(path) {
        return this.http.get(this.host + this.getAllUtilisateursPath)
        .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.host + this.getUtilisateurByIdPath + id)
        .map((response: Response) => response.json());
    }

    create(utilisateur: Utilisateur) {
        return this.http.post(this.host + this.addUtilisateurPath, utilisateur)
        .map((response: Response) => response.json());
    }

    update(utilisateur: Utilisateur) {
        return this.http.put(this.host + this.updateUtilisateurPath  + utilisateur.idUtilisateur, utilisateur)
        .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.host + this.deleteUtilisateurPath + id)
        .map((response: Response) => response.json());
    }

    // // private helper methods
    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUtilisateur = JSON.parse(localStorage.getItem('currentUtilisateur'));
    //     if (currentUtilisateur && currentUtilisateur.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUtilisateur.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }

    private extractData(res: Response) {
	    let body = res.json();
        return body;
    }

    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }

}