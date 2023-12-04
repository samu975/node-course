import { v4 as uuidv4 } from 'uuid';
import { IUser, IUserExtended } from '../interfaces/IUser';
import usersDb from './users-db';

let users = usersDb;

const userRepository = {
  create: (user: IUser): IUserExtended => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    return newUser;
  },

  getOneByEmail: (email: string) => {
    return users.find((u) => u.email === email);
  },

  getOneById: (id: string) => {
    return users.find((u) => u.id === id);
  },

  getAll: () => {
    return users;
  },

  delete: (id: string) => {
    users = users.filter((u) => u.id !== id);
  },
};

export default userRepository;
