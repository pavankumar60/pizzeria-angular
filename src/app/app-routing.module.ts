import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderpizzaComponent } from './orderpizza/orderpizza.component';
import { PizzashoppingComponent } from './pizzashopping/pizzashopping.component';
import { BuildyourpizzaComponent } from './buildyourpizza/buildyourpizza.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'orderpizza',
    component: OrderpizzaComponent
  },
  {
    path: 'pizzashopping',
    component: PizzashoppingComponent
  },
  {
    path: 'buildyourpizza',
    component: BuildyourpizzaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
