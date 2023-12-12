import { Order } from './order.entity';
import { Product } from './product.entity';
export declare class OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    order: Order;
}
