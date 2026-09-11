import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartCount$: Observable<number>;
  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.count$
  }
}

