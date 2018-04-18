import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '../../Views/Client/client.component';
import { ProduitComponent } from '../../Views/Produit/export';
import { VendeurComponent } from '../../Views/Vendeur/export';

import { AuthGuardService } from '../Guards/auth-guard.service';

const clientRoutes: Routes = [
	{
		path: '',
		component: ClientComponent,
		canActivateChild: [AuthGuardService],
		children: [
			{
				path: 'vendeur',
				component: VendeurComponent
			}
		]
	},
	{
		path: 'produit',
		component: ProduitComponent
	},
	{
		path: 'client',
		component: ClientComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(clientRoutes)],
	exports: [RouterModule]
})
export class ClientRoutingModule { }
