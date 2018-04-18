import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    host = "http://localhost:8080";
    sendUserPath = "/utilisateurs/auth-utilisateur";

    login(nomUtilisateur: string, motPasse: string) {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

        console.log("LOGIN USERNAME: " + nomUtilisateur);
        console.log("LOGIN PASSWORD: " + motPasse);

        return this.http.post(this.host + this.sendUserPath, 
            JSON.stringify({ "nomUtilisateur" : nomUtilisateur, "motPasse": motPasse })
        , options).map((response: Response) => {
               
                let user = response.json();
                console.log("REPONSE: " + user);

                if (user) {
                    // store user details 
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}