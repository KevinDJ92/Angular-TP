import { NgModule }      from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProduitComponent } from '../../Views/Produit/export';
import { ClientComponent } from '../../Views/Client/export';
import { VendeurComponent } from '../../Views/Vendeur/export';

import { LoginComponent } from '../../Views/Login/export';
import { RegisterComponent } from '../../Views/Register/export';
import { AppLayout }  from '../Layout/app.layout';

import { AuthGuardService } from '../Guards/auth-guard.service';

// import { AuthGuard } from '../Guards/export';

const routes: Routes = [
	{
		path: '',
		component: AppLayout,
		canActivate: [ AuthGuardService ],
		children: [
			// {
			//    path: '',
			//    loadChildren: '../Modules/client.module#ClientModule'
			// },
			{
				path: 'client',
				component: ClientComponent
			 },
			 {
				path: 'produit',
				component: ProduitComponent
			 },
			 {
				path: 'admin',
				canActivateChild: [AuthGuardService],
				children: [
					{
						path: 'vendeur',
						component: VendeurComponent
					},
				]
			 }
		]
	 },
	{
	   path: 'login',
	   loadChildren: '../Modules/auth.module#AuthModule'
	},
	{
		path: 'register',
		component: RegisterComponent
	 }
];

@NgModule({
  imports: [ 
		  RouterModule.forRoot(routes),
		  FormsModule, ReactiveFormsModule
  ],
  exports: [ 
          RouterModule 
  ]
})
export class AppRoutingModule{ } 