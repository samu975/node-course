import { generateId } from '../helpers/generateId';
import { Cart } from '../models/cart.model';

let carts: Cart[] = [];

export const createCart = (userId: string): Cart => {
  const newCart: Cart = {
    id: generateId(),
    userId: userId,
    items: [],
    isDeleted: false,
  };

  carts.push(newCart);
  return newCart;
};

export const getCartByUserId = (userId: string): Cart | undefined => {
  return carts.find((cart) => cart.userId === userId && !cart.isDeleted);
};

export const getCartById = (id: string): Cart | undefined => {
  return carts.find((cart) => cart.id === id && !cart.isDeleted);
};

export const addToCart = (
  cartId: string,
  productId: string,
  quantity: number
): void => {
  const index = carts.findIndex((c) => c.id === cartId);
  carts[index].items.push({ productId, quantity });
};

export const deleteCart = (id: string): void => {
  const index = carts.findIndex((c) => c.id === id);
  carts[index].isDeleted = true;
};

export const updateCart = (cart: Cart): void => {
  const index = carts.findIndex((c) => c.id === cart.id);
  carts[index] = cart;
};

export const markCartAsDeleted = (id: string): void => {
  const index = carts.findIndex((c) => c.id === id);
  carts[index].isDeleted = true;
};
