import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { Pizza } from '../models/pizza';
import { Topping } from '../models/topping';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Cart[] = [];
  private cartSubject = new BehaviorSubject<Cart[]>([]);
  cart$ = this.cartSubject.asObservable();
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor() { }



  addToCart(pizza:Pizza, toppings: Topping[] = []) {
    const existing = this.cartItems.find(
      item => item.pizza.id === pizza.id &&
      JSON.stringify(item.selectedToppings) === JSON.stringify(toppings) 
    );

    if (existing){
      existing.quantity++;
      existing.total = pizza.price * existing.quantity
    } else {
      this.cartItems.push({
        pizza:pizza,
        quantity: 1,
        selectedToppings: toppings,
        total: pizza.price
      });
    }
    pizza.quantity++;
    this.updateCart();
  }

  increaseQuantity(cartItem: Cart) {
    cartItem.quantity++;
    cartItem.pizza.quantity++;
    cartItem.total = cartItem.pizza.price * cartItem.quantity;
    this.updateCart();
  }

  decreaseQuantity(cartItem: Cart){
    if(cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.pizza.quantity--;
      cartItem.total = 
        cartItem.pizza.price * cartItem.quantity;
    }else{
      cartItem.pizza.quantity = 0;
      this.cartItems = this.cartItems.filter(
        item => item !== cartItem
      );
    }
    this.updateCart();
  }

  removeItem(cartItem: Cart) {
    cartItem.pizza.quantity = 0;
    this.cartItems = this.cartItems.filter(item => item !== cartItem);
    this.updateCart();   
  }

  getCartItemByPizzaId(id:number){
    return this.cartItems.find(
      item => item.pizza.id === id
    );
  }

  getGrandTotal(): number {
    return this.getPizzaTotal() + this.getToppingsTotal();
  }

  getPizzaTotal(): number {
    return this.cartItems
    .filter(item => item.pizza.name !== 'Custom Pizza')
    .reduce((sum, item) => {
      return sum + (item.pizza.price * item.quantity)
    },0);
  }

  getToppingsTotal(): number {
    return this.cartItems
    .filter(item => item.pizza.name === 'Custom Pizza')
    .reduce((sum, item) => {

      return sum + item.total;
    },0);
  }

  private getToppingsPrice(toppings: Topping[]): number {
    return toppings.reduce((sum, t) => sum + t.price, 0);
  }

  clearCart() {
    this.cartItems.forEach(item => {
      item.pizza.quantity = 0;
    });
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]);
    this.countSubject.next(this.getUniquePizzaCount());
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.quantity, 0
    );
  }

  getUniquePizzaCount(): number {
    return this.cartItems.filter(item => item.pizza.name !== 'Custom Pizza').length
  }
}
