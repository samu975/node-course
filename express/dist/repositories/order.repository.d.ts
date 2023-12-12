import { Order, OrderItem } from '../models/order.model';
export declare const addOrder: (userId: string, items: OrderItem[]) => Order;
export declare const getOrdersByUserId: (userId: string) => Order[];
export declare const getOrderById: (id: string) => Order | undefined;
export declare const updateOrder: (order: Order) => void;
export declare const deleteOrder: (id: string) => void;
