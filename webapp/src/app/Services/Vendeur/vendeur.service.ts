import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Vendeur } from '../../Models/vendeur';
// import { HandlerClass } from '../Handlers/handler.class';

@Injectable()
export class VendeurService {
	//URL for CRUD operations
	getAllVendeursUrl = "http://localhost:8080/vendeurs/all-vendeurs";
	addVendeurUrl = "http://localhost:8080/vendeurs/add-vendeur";

	updateVendeurUrl = "http://localhost:8080/vendeurs/update-vendeur";
	deleteVendeurUrl = "http://localhost:8080/vendeurs/delete-vendeur";
	getByVendeurByIdUrl = "http://localhost:8080/vendeurs/id";
	getByVendeurByUpcUrl = "http://localhost:8080/vendeurs/upc";

	//Create constructor to get Http instance
	constructor(private http:Http) {}

	//Fetch all vendeur
    getAllVendeurs(): Observable<Vendeur[]> {
        return this.http.get(this.getAllVendeursUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create vendeur
    createVendeur(vendeur: Vendeur):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

		return this.http.post(this.addVendeurUrl, vendeur, options)
               .map(success => success.status)
               .catch(this.handleError);
	}
	
	
	//Fetch vendeur by id
    getVendeurById(vendeurId: number): Observable<Vendeur> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();

		let options = new RequestOptions({ headers: cpHeaders });

		return this.http.get(this.getByVendeurByIdUrl + '/' + vendeurId, options)
			   .map(this.extractData)
			   .catch(this.handleError);
	}

	//Update vendeur
    updateVendeur(vendeur: Vendeur):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.updateVendeurUrl, vendeur, options)
			   .map(success => success.status)
			   .catch(this.handleError);
	}
	
    //Delete vendeur	
    deleteVendeurById(vendeurId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', vendeurId);	

		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		
		return this.http.delete(this.deleteVendeurUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }	

	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }

    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}