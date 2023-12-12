import { User } from './user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: number;
    user: User;
    items: CartItem[];
    isDeleted: boolean;
}
