import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { LoginComponent }  from '../../Views/Login/login.component';
// import { ProduitComponent } from '../../Views/Produit/export';
// import { ClientComponent } from '../../Views/Client/export';
// import { VendeurComponent } from '../../Views/Vendeur/export';

import { AuthRoutingModule }  from '../Router/auth-routing.module';

@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
		AuthRoutingModule
  ], 
  declarations: [
        LoginComponent
      //   , ProduitComponent, ClientComponent, VendeurComponent
  ]
})
export class AuthModule { }