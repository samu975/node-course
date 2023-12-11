import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';

export const createCart = (req: Request, res: Response): void => {
  const cart = cartService.createCart(req.body.userId);
  res.status(201).json(cart);
};

export const getCartByUserId = (req: Request, res: Response): void => {
  const cart = cartService.getCartByUserId(req.params.userId);
  if (!cart) {
    res.status(404).send('Cart not found').end();
    return;
  }
  res.status(200).json(cart);
};

export const getCartById = (req: Request, res: Response): void => {
  const cart = cartService.getCartById(req.params.id);
  if (!cart) {
    res.status(404).send('Cart not found').end();
    return;
  }
  res.status(200).json(cart);
};

export const addToCart = (req: Request, res: Response): void => {
  cartService.addToCart(req.body.cartId, req.body.productId, req.body.quantity);
  res.status(204).end();
};

export const deleteCart = (req: Request, res: Response): void => {
  cartService.deleteCart(req.params.id);
  res.status(204).end();
};

export const updateCart = (req: Request, res: Response): void => {
  cartService.updateCart(req.body);
  res.status(200).end();
};

export const markCartAsDeleted = (req: Request, res: Response): void => {
  cartService.markCartAsDeleted(req.params.id);
  res.status(204).end();
};
