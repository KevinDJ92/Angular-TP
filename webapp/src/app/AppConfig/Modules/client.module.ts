import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { ClientComponent }  from '../../Views/Client/client.component';
import { ProduitComponent } from '../../Views/Produit/export';
import { VendeurComponent } from '../../Views/Vendeur/export';

import { ClientService } from '../../Services/Client/client.service';
import { ClientRoutingModule } from '../Router/client-routing.module';

@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
		ClientRoutingModule
  ], 
  declarations: [
		ClientComponent, ProduitComponent, VendeurComponent
  ],
  providers: [ ClientService ]
})

export class ClientModule { }