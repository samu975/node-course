import { generateId } from '../helpers/generateId';
import { User } from '../models/user.model';

const users: User[] = [];

export const addUser = (user: User): void => {
  const newUser: User = {
    ...user,
    id: generateId(),
  };
  users.push(newUser);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const updateUser = (user: User): void => {
  const index = users.findIndex((u) => u.id === user.id);
  users[index] = user;
};

export const deleteUser = (id: string): void => {
  const index = users.findIndex((u) => u.id === id);
  users.splice(index, 1);
};
