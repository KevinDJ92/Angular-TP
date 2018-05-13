import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Client } from '../../Models/client';

@Injectable()
export class ClientService {
	//URL for CRUD operations
	getAllClientsUrl = "http://localhost:8080/clients/all-clients";
	addClientUrl = "http://localhost:8080/clients/add-client";

	updateClientUrl = "http://localhost:8080/clients/update-client";
	deleteClientUrl = "http://localhost:8080/clients/delete-client";
	getByClientByIdUrl = "http://localhost:8080/clients/id";

	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}

	//Fetch all client
    getAllClients(): Observable<Client[]> {
        return this.http.get(this.getAllClientsUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);
	}
	
	//Create client
    createClient(client: Client):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

		return this.http.post(this.addClientUrl, client, options)
               .map(success => success.status)
               .catch(this.handleError);
	}
	
    getClientById(clientId: number): Observable<Client> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();

		let options = new RequestOptions({ headers: cpHeaders });

		return this.http.get(this.getByClientByIdUrl  + '/' + clientId, options)
			   .map(this.extractData)
			   .catch(this.handleError);
	}

	//Update client
    updateClient(client: Client):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.updateClientUrl, client, options)
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
