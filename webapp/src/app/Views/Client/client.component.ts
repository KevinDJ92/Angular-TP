import { Component, OnInit,  Inject, Injectable  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClientService } from '../../Services/Client/client.service';
import { UtilisateurService} from '../../Services/Utilisateur/utilisateur.service';

import { Client, IClient } from '../../Models/client';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthService } from '../../AppConfig/Guards/auth.service';

const CLIENT_KEY = 'client_key';
const PRODUIT_KEY = 'produit_key';

@Component({
   templateUrl: './client.component.html',
   styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit { 
   //Component properties
   allClients: Client[];
   statusCode: number;

   _listFilter: string;
   errorMessage: string;

   requestProcessing = false;
   clientIdToUpdate = null;
   processValidation = false;

   constructor(private ClientService: ClientService, private user: UtilisateurService,
	@Inject(SESSION_STORAGE) private storage: StorageService,
	private router: Router, private authService: AuthService) {}

   //Create form
   clientForm = new FormGroup({
		idClient: new FormControl(''),
		client: new FormControl('', Validators.required),
		telephone: new FormControl('', Validators.required),
		contact: new FormControl('', Validators.required),
		adresse: new FormControl('', Validators.required),  
		description: new FormControl('', Validators.required),
		codeUtilisateur: new FormControl('', Validators.required)
   });

   //Create ngOnInit() and and load clients
   ngOnInit(): void {
	   this.ClientService.getAllClients().
	   subscribe(clients => {
		   this.clients = clients;
		   this.filteredClients = this.clients;
	   },
	   error => this.errorMessage = <any>error);
   }

   filteredClients: IClient[];
   clients: IClient[] = [];

   get listFilter(): string {
	   return this._listFilter;
   }
   set listFilter(value: string) {
	   this._listFilter = value;
	   this.filteredClients = this.listFilter ? this.performFilter(this.listFilter) : this.clients;
   }
   
   performFilter(filterBy: string): IClient[] {
	   filterBy = filterBy.toLocaleLowerCase();
	   return this.clients.filter((client: IClient) =>
		   client.client.toLocaleLowerCase().indexOf(filterBy) !== -1);
   }

   choisirClient(idClient: number){	
	let current_idClient:number = Number(this.storage.get(CLIENT_KEY));

		if (current_idClient != 0){
			this.storage.remove(PRODUIT_KEY);
		}
		
		else {
			this.storage.set(CLIENT_KEY, idClient);
		}

        this.router.navigate([this.authService.getProduitUrl()]);
		
   }

   //Fetch all clients
   getAllClients() {
        this.ClientService.getAllClients()
		  .subscribe(
                data => this.allClients = data,
                errorCode => this.statusCode = errorCode);   
   }

   //Handle create and update client
   onClientFormSubmit() {
	  this.processValidation = true;   
	  if (this.clientForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   

	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let client = this.clientForm.value;

	  console.log(client);

	  if (this.clientIdToUpdate === null) {  
		   
		   //Create client
     	   this.ClientService.createClient(client)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllClients();	
					this.backToCreateClient();
				 },
				 errorCode => this.statusCode = errorCode
			   );		
	  } else {  
		  
   	    //Handle update client
		client.id_client = this.clientIdToUpdate; 	
		console.log("Current Client: ");	
		console.log(client);	
	    this.ClientService.updateClient(client)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllClients();	
					this.backToCreateClient();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }

   modifierClient(idClient: number) {
	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';

	this.preProcessConfigurations();

	this.ClientService.getClientById(idClient)
		.subscribe(client => {
			this.clientIdToUpdate = client.idClient;
			this.clientForm.setValue({
				idClient: client.idClient,
				client: client.client,
				telephone: client.telephone,
				contact: client.contact,
				adresse: client.adresse,
				description: client.description,
				codeUtilisateur: client.codeUtilisateur
			});

			this.processValidation = true;
			this.requestProcessing = false;
		},
		errorCode => this.statusCode = errorCode);
	}

	ajouterClient() {
		document.getElementById('light').style.display = 'block';
		document.getElementById('fade').style.display = 'block';
	}

//    //Delete client
//    deleteClient(clientId: string) {
//       this.preProcessConfigurations();
//       this.ClientService.deleteClientById(clientId)
// 	      .subscribe(successCode => {
// 		            //this.statusCode = successCode;
// 					//Expecting success code 204 from server
// 					this.statusCode = 204;
// 				    this.getAllClients();	
// 				    this.backToCreateClient();
// 			    },
// 		        errorCode => this.statusCode = errorCode);    
//    }

   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
	}

   //Go back from update to create
   backToCreateClient() {
      this.clientIdToUpdate = null;
      this.clientForm.reset();	  
	  this.processValidation = false;
   }
  
   print(): void {
		let printContents, popupWin;
		printContents = document.getElementById('print-section').innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin.document.open();
		popupWin.document.write(`
			<html>
				<head>
				<title>Print tab</title>
				
				</head>
			<body onload="window.print();window.close()">${printContents}</body>
			</html>`
		);
		popupWin.document.close();
	}
}