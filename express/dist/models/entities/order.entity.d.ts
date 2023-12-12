import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    user: User;
    items: OrderItem[];
}
