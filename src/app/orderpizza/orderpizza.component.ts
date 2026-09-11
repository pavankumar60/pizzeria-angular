import { Component } from '@angular/core';
import pizzas from '../../assets/dataforjson/pizzas.json';

import { CartService } from '../service/cart.service';
import { Pizza } from '../models/pizza';

@Component({
  selector: 'app-orderpizza',
  templateUrl: './orderpizza.component.html',
  styleUrls: ['./orderpizza.component.css']
})
export class OrderpizzaComponent {

  pizzas: Pizza[] = pizzas as Pizza[];

  constructor(private cartService: CartService) {}

  addToCart(pizza:Pizza){
    this.cartService.addToCart(pizza);
  }
 
  increase(pizza: Pizza) {
    const item = this.cartService.getCartItemByPizzaId(pizza.id);
    if(item){
      this.cartService.increaseQuantity(item);
    }
  }

  decrease(pizza: Pizza){
    const item = this.cartService.getCartItemByPizzaId(pizza.id)
    if(item){
      this.cartService.decreaseQuantity(item);
    }
  }

}
