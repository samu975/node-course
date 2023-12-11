import { generateId } from '../helpers/generateId';
import { Order, OrderItem } from '../models/order.model';

let orders: Order[] = [];

export const addOrder = (userId: string, items: OrderItem[]): Order => {
  const newOrder: Order = {
    id: generateId(),
    userId: userId,
    items: items,
  };
  orders.push(newOrder);
  return newOrder;
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((order) => order.id === id);
};

export const updateOrder = (order: Order): void => {
  const index = orders.findIndex((o) => o.id === order.id);
  orders[index] = order;
};

export const deleteOrder = (id: string): void => {
  const index = orders.findIndex((o) => o.id === id);
  orders.splice(index, 1);
};
