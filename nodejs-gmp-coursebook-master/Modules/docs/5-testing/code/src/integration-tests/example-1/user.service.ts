import omit from 'lodash.omit';
import userRepository from './db/user.repository';
import { IUser, IUserExtended } from './interfaces/IUser';

const OMIT_USER_FIELDS = ['password'];

type ICreateUserResponse = Omit<IUserExtended, 'password'>;

const userService = {
  create: (user: IUser) => {
    const existingUser = userRepository.getOneByEmail(user.email);

    if (existingUser) {
      throw new Error(`User with email ${user.email} already exists`);
    }

    const newUser = userRepository.create({ ...user, password: Buffer.from(user.password).toString('base64') });
    return omit(newUser, OMIT_USER_FIELDS) as ICreateUserResponse;
  },

  getAll: () => {
    return userRepository.getAll().map((u) => omit(u, OMIT_USER_FIELDS) as ICreateUserResponse);
  },

  delete: (id: string) => {
    const user = userRepository.getOneById(id);
    if (!user) {
      throw new Error(`No user with such id ${id}`);
    }
    return userRepository.delete(id);
  },
};

export default userService;
