import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppLayout } from '../Layout/app.layout';

import { AppRoutingModule }   from '../Router/router.component';

import { StorageServiceModule } from 'angular-webstorage-service';

// import { AuthGuard } from '../Guards/export';

import { AlertService, AuthenticationService } from '../../Services/Login/export';
import { AuthGuardService } from '../Guards/auth-guard.service';
import { AuthService } from '../Guards/auth.service';

import { UtilisateurService } from '../../Services/Utilisateur/utilisateur.service';
import { ProduitService } from '../../Services/Produit/produit.service';
import { ClientService } from '../../Services/Client/client.service';

// Components
import { LoginComponent } from '../../Views/Login/export';
import { RegisterComponent } from '../../Views/Register/export';
import { AlertComponent } from '../Directives/export';

import { ProduitComponent }  from '../../Views/Produit/produit.component';
import { ClientComponent }  from '../../Views/Client/client.component';
import { VendeurComponent } from '../../Views/Vendeur/vendeur.component';
import { PageNotFoundComponent }   from '../../not-found.component';

@NgModule({
    declarations: [
        AlertComponent,  RegisterComponent,
        AppLayout, ProduitComponent, ClientComponent, 
        VendeurComponent, PageNotFoundComponent
    ],
    imports: [
      BrowserModule, FormsModule,
      HttpModule,
      FormsModule, ReactiveFormsModule,
      AppRoutingModule, StorageServiceModule
  ],
  providers: [
    AlertService, AuthenticationService,
      AuthGuardService, AuthService,
      UtilisateurService, ProduitService, ClientService
  ],
  bootstrap: [AppLayout]
})

export class AppModule { }
