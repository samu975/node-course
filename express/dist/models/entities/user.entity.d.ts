import { Cart } from './cart.entity';
import { Order } from './order.entity';
export declare class User {
    id: number;
    name: string;
    cart: Cart;
    orders: Order[];
}
