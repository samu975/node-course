import * as UserRepository from '../repositories/user.repository';
import { User } from '../models/user.model';

export const createUser = (userData: User): User => {
  UserRepository.addUser(userData);
  return userData;
};

export const getUserByEmail = (email: string): User | undefined => {
  return UserRepository.getUserByEmail(email);
};

export const getUserById = (id: string): User | undefined => {
  return UserRepository.getUserById(id);
};

export const updateUser = (userData: User): void => {
  UserRepository.updateUser(userData);
};

export const deleteUser = (id: string): void => {
  UserRepository.deleteUser(id);
};
