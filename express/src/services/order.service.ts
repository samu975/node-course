import * as OrderRepository from '../repositories/order.repository';
import * as CartRepository from '../repositories/cart.repository';
import { Order } from '../models/order.model';

export const createOrderFromCart = (userId: string) => {
  const cart = CartRepository.getCartByUserId(userId);
  if (!cart) {
    throw new Error('No active cart found for the user');
  }
  const order = OrderRepository.addOrder(userId, cart.items);
  CartRepository.markCartAsDeleted(cart.id);
  return order;
};

export const getOrdersByUserId = (userId: string) => {
  return OrderRepository.getOrdersByUserId(userId);
};

export const getOrderById = (id: string) => {
  const order = OrderRepository.getOrderById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const updateOrder = (order: Order) => {
  OrderRepository.updateOrder(order);
};

export const deleteOrder = (id: string) => {
  const order = OrderRepository.getOrderById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  OrderRepository.deleteOrder(id);
};
