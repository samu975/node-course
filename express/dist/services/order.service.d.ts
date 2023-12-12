import { Order } from '../models/order.model';
export declare const createOrderFromCart: (userId: string) => Order;
export declare const getOrdersByUserId: (userId: string) => Order[];
export declare const getOrderById: (id: string) => Order;
export declare const updateOrder: (order: Order) => void;
export declare const deleteOrder: (id: string) => void;
