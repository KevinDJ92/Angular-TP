import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../Views/Login/login.component';

// import { ProduitComponent } from '../../Views/Produit/export';
// import { ClientComponent } from '../../Views/Client/export';
// import { VendeurComponent } from '../../Views/Vendeur/export';

import { AuthGuardService } from '../Guards/auth-guard.service';

// import { AuthGuard } from '../Guards/export';

const authRoutes: Routes = [
	{
		path: '',
		component: LoginComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
