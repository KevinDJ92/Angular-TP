// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from '../../Views/Login/login.component';

// import { ProduitComponent } from '../../Views/Produit/export';
// import { ClientComponent } from '../../Views/Client/export';
// import { VendeurComponent } from '../../Views/Vendeur/export';

// import { AuthGuardService } from '../Guards/auth-guard.service';

// import { AuthGuard } from '../Guards/export';

// const authRoutes: Routes = [
// 	{
// 		path: '',
// 		component: LoginComponent,
// 		children: [
// 			{
// 				path: 'client',
// 				component: ClientComponent,
// 				canActivateChild: [AuthGuardService],
// 				children: [
// 					{
// 						path: 'vendeur',
// 						component: VendeurComponent
// 					},
// 					{
// 						path: 'produit',
// 						component: ProduitComponent
// 					}
// 				]
// 			},
// 			{
// 				path: 'client',
// 				component: ClientComponent,
// 				loadChildren: '../Modules/client.module#ClientModule'
// 			 },
// 			{
// 				path: 'admin',
// 				loadChildren: '../Modules/client.module#ClientModule'
// 			}
// 		]
// 	}
// ];

// @NgModule({
// 	imports: [RouterModule.forChild(authRoutes)],
// 	exports: [RouterModule]
// })
// export class AuthRoutingModule { }
