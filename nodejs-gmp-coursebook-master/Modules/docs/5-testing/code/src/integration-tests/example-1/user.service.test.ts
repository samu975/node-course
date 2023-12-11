import { IUser } from './interfaces/IUser';
import userService from './user.service';

const USER_HELEN: IUser = {
  name: 'Helen',
  surname: 'Castro',
  email: 'helen.castro@epam.com',
  password: '12345',
};

const USER_ALICE: IUser = {
  name: 'Alice',
  surname: 'Watkins',
  email: 'alice.watkins@epam.com',
  password: '==password==',
};

const userIdsToDelete: (string | undefined)[] = [];

describe('User service', () => {
  describe('create user', () => {
    test('should create user if it does not exist', () => {
      userService.create(USER_HELEN);
      const users = userService.getAll();

      const newUser = users.find((u) => u.email === USER_HELEN.email);
      expect(newUser).not.toEqual(undefined);

      // to clean up db in afterAll()
      userIdsToDelete.push(newUser?.id);
    });

    test('should throw error if user exists', () => {
      const newUser = userService.create(USER_ALICE);
      expect(() => userService.create(USER_ALICE)).toThrow(`User with email ${USER_ALICE.email} already exists`);

      // to clean up db in afterAll()
      userIdsToDelete.push(newUser.id);
    });
  });

  describe('get all users', () => {
    test('should get all users', () => {
      const usersBefore = userService.getAll();

      const newUser = userService.create({ ...USER_ALICE, email: 'test@email.com' });
      const usersAfter = userService.getAll();

      expect(usersAfter.length).toEqual(usersBefore.length + 1);

      // to clean up db in afterAll()
      userIdsToDelete.push(newUser.id);
    });
  });

  describe('delete user', () => {
    test('should delete user if it exists', () => {
      const newUser = userService.create({ ...USER_HELEN, email: 'test1@email.com' });
      userService.delete(newUser.id);

      const newUserAfter = userService.getAll().find((u) => u.id === newUser.id);
      expect(newUserAfter).toBe(undefined);
    });

    test('should throw error if user does not exist', () => {
      const userId = 'random-id';
      expect(() => userService.delete(userId)).toThrow(`No user with such id ${userId}`);
    });
  });

  afterAll(() => {
    userIdsToDelete.forEach((id) => id && userService.delete(id));
  });
});
