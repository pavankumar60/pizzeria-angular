import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizzashopping',
  templateUrl: './pizzashopping.component.html',
  styleUrls: ['./pizzashopping.component.css']
})

export class PizzashoppingComponent {
  cartItems$: Observable<Cart[]>;
  showIngredients = false;

  constructor(public cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
  }

  toggleIngredients(){
    this.showIngredients = !this.showIngredients
  }

  increase(item: Cart) {
    this.cartService.increaseQuantity(item);
  }
  decrease(item: Cart) {
    this.cartService.decreaseQuantity(item);
  }
  remove(item: Cart) {
    this.cartService.removeItem(item);
  }
  clearCart() {
    this.cartService.clearCart();
  }
  getPizzaTotal(): number {
    return this.cartService.getPizzaTotal();
  }
  getToppingsTotal(): number {
    return this.cartService.getToppingsTotal();
  }

  getGrandTotal(): number {
    return this.cartService.getGrandTotal();
  }


  
}