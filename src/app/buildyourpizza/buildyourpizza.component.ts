import { Component } from '@angular/core';
import { Router } from '@angular/router';
import toppings from '../../assets/dataforjson/toppings.json';
import { Topping } from '../models/topping';
import { Pizza } from '../models/pizza';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-buildyourpizza',
  templateUrl: './buildyourpizza.component.html',
  styleUrls: ['./buildyourpizza.component.css']
})
export class BuildyourpizzaComponent {

  toppings: Topping[] = toppings as Topping[];
  selectedToppings: Topping[] = [];
  totalCost = 0;

  customPizza: Pizza = {
    id: 999,
    name: 'Custom Pizza',
    description: 'Build your Own Pizza',
    type: 'veg',
    image:'https://cdn-icons-png.flaticon.com/512/6978/6978255.png',
    price: 0,
    quantity: 0,
    ingredients: [],
    toppings: []
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  toggleTopping(event: any, topping: Topping) {
    if (event.target.checked) {
      this.selectedToppings.push(topping);
    }else{
      this.selectedToppings = 
      this.selectedToppings.filter(t => t.id !== topping.id)
    }
    this.calculatedPrice();
  }

  calculatedPrice() {
    this.totalCost = this.selectedToppings.reduce((sum, t) => sum + t.price, 0);
  }

  addToCart() {
    if (this.selectedToppings.length === 0){
      this.router.navigate(['/pizzashopping'])
      return;
    }
    this.customPizza.price = this.totalCost;
    this.customPizza.toppings = 
      this.selectedToppings.map(t => t.tname);
    this.cartService.addToCart(
      this.customPizza,[...this.selectedToppings]
    );
    this.router.navigate(['/pizzashopping'])
  }

  increase() {
    const item = this.cartService.getCartItemByPizzaId(this.customPizza.id);
    if(item) {
      this.cartService.increaseQuantity(item);
    }
  }

  decrease() {
    const item = this.cartService.getCartItemByPizzaId(this.customPizza.id);
    if(item){
      this.cartService.decreaseQuantity(item);
    }
  }

}








