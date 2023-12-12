import { Cart } from '../models/cart.model';
export declare const createCart: (userId: string) => Cart;
export declare const getCartByUserId: (userId: string) => Cart | undefined;
export declare const getCartById: (id: string) => Cart | undefined;
export declare const addToCart: (cartId: string, productId: string, quantity: number) => void;
export declare const deleteCart: (id: string) => void;
export declare const updateCart: (cart: Cart) => void;
export declare const markCartAsDeleted: (id: string) => void;
