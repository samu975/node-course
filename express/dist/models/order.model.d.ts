export interface OrderItem {
    productId: string;
    quantity: number;
}
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
}
