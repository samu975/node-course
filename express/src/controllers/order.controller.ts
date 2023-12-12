import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const createOrderFromCart = (req: Request, res: Response): void => {
  const order = orderService.createOrderFromCart(req.body.userId);
  res.status(201).json(order);
};

export const getOrdersByUserId = (req: Request, res: Response): void => {
  const orders = orderService.getOrdersByUserId(req.params.userId);
  if (!orders) {
    res.status(404).send('Orders not found').end();
    return;
  }
  res.status(200).json(orders);
};

export const getOrderById = (req: Request, res: Response): void => {
  const order = orderService.getOrderById(req.params.id);
  if (!order) {
    res.status(404).send('Order not found').end();
    return;
  }
  res.status(200).json(order);
};

export const updateOrder = (req: Request, res: Response): void => {
  const order = orderService.updateOrder(req.body);
  res.status(200).json(order);
};

export const deleteOrder = (req: Request, res: Response): void => {
  orderService.deleteOrder(req.params.id);
  res.status(204).end();
};
