import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Produit } from '../../Models/produit';
// import { HandlerClass } from '../Handlers/handler.class';

@Injectable()
export class ProduitService {
	//URL for CRUD operations
	getAllProduitsUrl = "http://localhost:8080/produits/all-produits";
	addProduitUrl = "http://localhost:8080/produits/add-produit";

	updateProduitUrl = "http://localhost:8080/produits/update-produit";
	deleteProduitUrl = "http://localhost:8080/produits/delete-produit";
	getByProduitByIdUrl = "http://localhost:8080/produits/id";
	getByProduitByUpcUrl = "http://localhost:8080/produits/upc";

	//Create constructor to get Http instance
	constructor(private http:Http) {}

	//Fetch all produit
    getAllProduits(): Observable<Produit[]> {
        return this.http.get(this.getAllProduitsUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create produit
    createProduit(produit: Produit):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

		return this.http.post(this.addProduitUrl, produit, options)
               .map(success => success.status)
               .catch(this.handleError);
	}
	
	
	//Fetch produit by id
    getProduitById(produitId: number): Observable<Produit> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();

		let options = new RequestOptions({ headers: cpHeaders });

		return this.http.get(this.getByProduitByIdUrl + '/' + produitId, options)
			   .map(this.extractData)
			   .catch(this.handleError);
	}

	//Update produit
    updateProduit(produit: Produit):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.updateProduitUrl, produit, options)
			   .map(success => success.status)
			   .catch(this.handleError);
	}
	
    //Delete produit	
    deleteProduitById(produitId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', produitId);	

		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		
		return this.http.delete(this.deleteProduitUrl, options)
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