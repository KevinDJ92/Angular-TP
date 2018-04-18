import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { VendeurService } from '../../Services/Vendeur/vendeur.service';
import { UtilisateurService } from '../../Services/Utilisateur/utilisateur.service';

import { Vendeur, IVendeur} from '../../Models/vendeur';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

const PRODUIT_KEY = 'vendeur_key';

@Component({
	templateUrl: './vendeur.component.html',
	styleUrls: ['./vendeur.component.css']
})

export class VendeurComponent implements OnInit {
	//Component properties
	allVendeurs: Vendeur[];
	vendeur: Vendeur;
	statusCode: number;

	_listFilter: string;
	errorMessage: string;

	requestProcessing = false;
	vendeurIdToUpdate = null;
	processValidation = false;

	constructor(private VendeurService: VendeurService, private user: UtilisateurService,
		@Inject(SESSION_STORAGE) private storage: StorageService) {
	}

	ajouterVendeurAuPanier(idVendeur:number){
		var listVendeur = this.storage.get(PRODUIT_KEY);
		
		// Convertir en tableau
		var JSONObject = JSON.parse(listVendeur);
	
		// get size
		var size = Object.keys(JSONObject).length;
		
		// metter le vendeur dans la session
		this.storage.set(PRODUIT_KEY, JSON.stringify(listVendeur));		
	}


	//Create form
	vendeurForm = new FormGroup({
		idVendeur: new FormControl(''),
		idUtilisateur: new FormControl('', Validators.required),
		taux:new FormControl('', Validators.required),
		typeCommission: new FormControl('', Validators.required),
		minVentes: new FormControl('', Validators.required)
	});

	//Create ngOnInit() and and load vendeurs
	ngOnInit(): void {
		this.VendeurService.getAllVendeurs();
	}

	//Fetch all vendeurs
	getAllVendeurs() {
		this.VendeurService.getAllVendeurs()
			.subscribe(
			data => this.allVendeurs = data,
			errorCode => this.statusCode = errorCode);
	}

	//Handle create and update vendeur
	onVendeurFormSubmit() {
		this.processValidation = true;
		if (this.vendeurForm.invalid) {
			return; //Validation failed, exit from method.
		}

		//Form is valid, now perform create or update
		this.preProcessConfigurations();
		let vendeur = this.vendeurForm.value;

		console.log(vendeur);

		if (this.vendeurIdToUpdate === null) {

			//Create vendeur
			this.VendeurService.createVendeur(vendeur)
				.subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllVendeurs();
					this.backToCreateVendeur();
				},
				errorCode => this.statusCode = errorCode
				);
		} else {

			console.log("CLIENT TO UPDATE IS NOT NULL!!!");

			//Handle update vendeur
			vendeur.id_vendeur = null;
			console.log("Current vendeur: ");
			console.log(vendeur);
			this.VendeurService.updateVendeur(vendeur)
				.subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllVendeurs();
					this.backToCreateVendeur();
				},
				errorCode => this.statusCode = errorCode);
		}
	}

	ajouterVendeur() {
		document.getElementById('light').style.display = 'block';
		document.getElementById('fade').style.display = 'block';
	}

	//Load vendeur by id to edit
	loadVendeurToEdit(vendeurId: number) {
		this.preProcessConfigurations();

		this.VendeurService.getVendeurById(vendeurId)
			.subscribe(vendeur => {
				this.vendeurForm.setValue({
					idVendeur: vendeur.idVendeur,
					idUtilisateur: vendeur.idUtilisateur,
					taux: vendeur.taux,
					typeCommission: vendeur.typeCommission,
					minVentes: vendeur.minVentes
				});
				this.processValidation = true;
				this.requestProcessing = false;
			},
			errorCode => this.statusCode = errorCode);
	}

	modifierVendeur(idVendeur: number) {
		document.getElementById('light').style.display = 'block';
		document.getElementById('fade').style.display = 'block';

		this.preProcessConfigurations();

		console.log("ENTERED Edit");
		console.log("!!!Vendeur!!!!");

		// this.vendeur =  this.VendeurService.getVendeurById(idVendeur);

		this.VendeurService.getVendeurById(idVendeur)
			.subscribe(vendeur => {
				this.vendeurIdToUpdate = vendeur.idVendeur;
				this.vendeurForm.setValue({
					idVendeur: vendeur.idVendeur,
					idUtilisateur: vendeur.idUtilisateur,
					taux: vendeur.taux,
					typeCommission: vendeur.typeCommission,
					minVentes: vendeur.minVentes
				});
				this.processValidation = true;
				this.requestProcessing = false;
			},
			errorCode => this.statusCode = errorCode);
	}


	//Delete vendeur
	deleteVendeur(vendeurId: string) {
		this.preProcessConfigurations();
		this.VendeurService.deleteVendeurById(vendeurId)
			.subscribe(successCode => {
				//this.statusCode = successCode;
				//Expecting success code 204 from server
				this.statusCode = 204;
				this.getAllVendeurs();
				this.backToCreateVendeur();
			},
			errorCode => this.statusCode = errorCode);
	}

	//Perform preliminary processing configurations
	preProcessConfigurations() {
		this.statusCode = null;
		this.requestProcessing = true;
	}

	//Go back from update to create
	backToCreateVendeur() {
		this.vendeurIdToUpdate = null;
		this.vendeurForm.reset();
		this.processValidation = false;
	}
}