import {Pizza} from "./pizza"
import { Topping } from "./topping";

export interface Cart {
    pizza:Pizza;
    quantity:number;
    selectedToppings:Topping[];
    total:number;
}