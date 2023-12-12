import * as CartRepository from '../repositories/cart.repository';
import { Cart } from '../models/cart.model';

export const createCart = (userId: string) => {
  let cart = CartRepository.getCartByUserId(userId);
  if (!cart) {
    cart = CartRepository.createCart(userId);
  }
  return cart;
};

export const getCartByUserId = (userId: string) => {
  const cart = CartRepository.getCartByUserId(userId);
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const addToCart = (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const cart = CartRepository.getCartById(cartId);
  if (!cart) {
    throw new Error('Cart not found');
  }
  CartRepository.addToCart(cartId, productId, quantity);
};

export const getCartById = (id: string) => {
  const cart = CartRepository.getCartById(id);
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const deleteCart = (id: string) => {
  const cart = CartRepository.getCartById(id);
  if (!cart) {
    throw new Error('Cart not found');
  }
  CartRepository.deleteCart(id);
};

export const updateCart = (cart: Cart) => {
  CartRepository.updateCart(cart);
};

export const markCartAsDeleted = (id: string) => {
  const cart = CartRepository.getCartById(id);
  if (!cart) {
    throw new Error('Cart not found');
  }
  CartRepository.markCartAsDeleted(id);
};
