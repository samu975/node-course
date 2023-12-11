import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const createUser = (req: Request, res: Response): void => {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
};

export const getUserByEmail = (req: Request, res: Response): void => {
  const user = userService.getUserByEmail(req.params.email);
  if (!user) {
    res.status(404).send('User not found').end();
    return;
  }
  res.status(200).json(user);
};

export const getUserById = (req: Request, res: Response): void => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).send('User not found').end();
    return;
  }
  res.status(200).json(user);
};

export const updateUser = (req: Request, res: Response): void => {
  const user = userService.updateUser(req.body);
  res.status(200).json(user);
};

export const deleteUser = (req: Request, res: Response): void => {
  userService.deleteUser(req.params.id);
  res.status(204).end();
};
