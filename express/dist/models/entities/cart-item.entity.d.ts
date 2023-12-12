import { Cart } from './cart.entity';
import { Product } from './product.entity';
export declare class CartItem {
    id: number;
    product: Product;
    quantity: number;
    cart: Cart;
}
