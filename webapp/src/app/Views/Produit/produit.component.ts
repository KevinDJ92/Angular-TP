import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProduitService } from '../../Services/Produit/produit.service';
import { UtilisateurService } from '../../Services/Utilisateur/utilisateur.service';

import { Produit, IProduct } from '../../Models/produit';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

const ClIENT_KEY = 'client_key';
const PRODUIT_KEY = 'produit_key';

@Component({
	templateUrl: './produit.component.html',
	styleUrls: ['./produit.component.css']
})

export class ProduitComponent implements OnInit {
	//Component properties
	allProduits: Produit[];
	produit: Produit;
	statusCode: number;

	_listFilter: string;
	errorMessage: string;

	chosenProduit: number;

	requestProcessing = false;
	produitIdToUpdate = null;
	processValidation = false;

	filteredProduits: IProduct[];
	products: IProduct[] = [];
	panierProduit: IProduct[] = [];

	constructor(private ProduitService: ProduitService, private user: UtilisateurService,
		@Inject(SESSION_STORAGE) private storage: StorageService) {}

		
	ajouterProduitAuPanier(){
		let listProduit = this.storage.get(PRODUIT_KEY);
	
		let produit = this.panierForm.value;

		if (listProduit === null){
			arrayProduit = [this.chosenProduit, produit.quantite];
		}
		else {
			// Convertir en tableau
			var arrayProduit = JSON.parse(listProduit);

			arrayProduit.push(this.chosenProduit, produit.quantite);
		}

		// metter le produit dans la session
		this.storage.set(PRODUIT_KEY, JSON.stringify(arrayProduit));

		document.getElementById('li').style.display='none';
		document.getElementById('fa').style.display='none'	
	}

	searchProduit(){
		let listProduit = this.storage.get(PRODUIT_KEY);
		let nbPanier = 0;

		if (listProduit !== null){
			console.log("listProduit est pas NULL");

			var arrayProduit = JSON.parse(listProduit);
			
			console.log("ArrayProduit: ");
			console.log(arrayProduit);

			 for (let i = 0; i <= arrayProduit.length; i +=2){
				console.log("Valeur i: " + i);
				
				if (i % 2 == 0){	
					console.log("la variable i est PAIR");
					let j = 0;

					while ( j > this.products.length
						 &&  arrayProduit[i] != this.products[j].idProduit){
							console.log("Entered for while loop");
					}

					if (arrayProduit[i] == this.products[j].idProduit){	
						console.log("arrayProduit pos 1 " + arrayProduit[i]);
						console.log("product ID " + this.products[j].idProduit);
				
						this.panierProduit.push(this.products[j]);

						this.panierProduit[nbPanier].quantite = arrayProduit[i + 1];
						nbPanier += 1;
					}
				}
			}
		}

		document.getElementById('box').style.display='block';
		document.getElementById('fad').style.display='block';
	}

	allerProduitAuPanier(idProduit:number){
		this.chosenProduit = idProduit;

		document.getElementById('li').style.display='block';
		document.getElementById('fa').style.display='block';
	}

	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredProduits = this.listFilter ? this.performFilter(this.listFilter) : this.products;
	}
	
	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.nomProduit.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}
	
	//Create form
	produitForm = new FormGroup({
		idProduit: new FormControl(''),
		upc: new FormControl('', Validators.required),
		nomProduit: new FormControl('', Validators.required),
		image: new FormControl('', Validators.required),
		categorie: new FormControl('', Validators.required),
		codeUnit: new FormControl('', Validators.required),
		prixVendant: new FormControl('', Validators.required),
		prixAchat: new FormControl('', Validators.required),
		quantite: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required)
	});

	//Create form
	panierForm = new FormGroup({
		quantite: new FormControl('', Validators.required)
	});

	//Create ngOnInit() and and load produits
	ngOnInit(): void {
		this.ProduitService.getAllProduits().
			subscribe(products => {
				this.products = products;
				this.filteredProduits = this.products;
			},
			error => this.errorMessage = <any>error);
	}

	//Fetch all produits
	getAllProduits() {
		this.ProduitService.getAllProduits()
			.subscribe(
			data => this.allProduits = data,
			errorCode => this.statusCode = errorCode);
	}

	//Handle create and update produit
	onProduitFormSubmit() {
		this.processValidation = true;
		if (this.produitForm.invalid) {
			return; //Validation failed, exit from method.
		}

		//Form is valid, now perform create or update
		this.preProcessConfigurations();
		let produit = this.produitForm.value;

		console.log(produit);

		if (this.produitIdToUpdate === null) {

			//Create produit
			this.ProduitService.createProduit(produit)
				.subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllProduits();
					this.backToCreateProduit();
				},
				errorCode => this.statusCode = errorCode
				);
		} else {

			//Handle update produit
			produit.id_produit = null;
			this.ProduitService.updateProduit(produit)
				.subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllProduits();
					this.backToCreateProduit();
				},
				errorCode => this.statusCode = errorCode);
		}
	}

	ajouterProduit() {
		document.getElementById('light').style.display = 'block';
		document.getElementById('fade').style.display = 'block';
	}

	// //Load produit by id to edit
	// loadProduitToEdit(produitId: number) {
	// 	this.preProcessConfigurations();

	// 	this.ProduitService.getProduitById(produitId)
	// 		.subscribe(produit => {
	// 			this.produitForm.setValue({
	// 				idProduit: produit.idProduit,
	// 				upc: produit.upc,
	// 				nomProduit: produit.nomProduit,
	// 				image: produit.image,
	// 				categorie: produit.categorie,
	// 				codeUnit: produit.codeUnit,
	// 				prixVendant: produit.prixVendant,
	// 				prixAchat: produit.prixAchat,
	// 				quantite: produit.quantite,
	// 				description: produit.description
	// 			});
	// 			this.processValidation = true;
	// 			this.requestProcessing = false;
	// 		},
	// 		errorCode => this.statusCode = errorCode);
	// }

	modifierProduit(idProduit: number) {
		document.getElementById('light').style.display = 'block';
		document.getElementById('fade').style.display = 'block';

		this.preProcessConfigurations();

		console.log("ENTERED Edit");
		console.log("!!!Produit!!!!");


		// this.produit =  this.ProduitService.getProduitById(idProduit);

		this.ProduitService.getProduitById(idProduit)
			.subscribe(produit => {
				this.produitIdToUpdate = produit.idProduit;
				this.produitForm.setValue({
					idProduit: produit.idProduit,
					upc: produit.upc,
					nomProduit: produit.nomProduit,
					image: produit.image,
					categorie: produit.categorie,
					codeUnit: produit.codeUnit,
					prixVendant: produit.prixVendant,
					prixAchat: produit.prixAchat,
					quantite: produit.quantite,
					description: produit.description
				});

				this.processValidation = true;
				this.requestProcessing = false;
			},
			errorCode => this.statusCode = errorCode);
	}

	onAjouterProduitPanier(quantite:number){
		
	}

	ajouterProduitPanier(quantite:number){

	}

	//Delete produit
	deleteProduit(produitId: string) {
		this.preProcessConfigurations();
		this.ProduitService.deleteProduitById(produitId)
			.subscribe(successCode => {
				//this.statusCode = successCode;
				//Expecting success code 204 from server
				this.statusCode = 204;
				this.getAllProduits();
				this.backToCreateProduit();
			},
			errorCode => this.statusCode = errorCode);
	}

	//Perform preliminary processing configurations
	preProcessConfigurations() {
		this.statusCode = null;
		this.requestProcessing = true;
	}

	//Go back from update to create
	backToCreateProduit() {
		this.produitIdToUpdate = null;
		this.produitForm.reset();
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