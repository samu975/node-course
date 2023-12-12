import { User } from '../models/user.model';
export declare const createUser: (userData: User) => User;
export declare const getUserByEmail: (email: string) => User | undefined;
export declare const getUserById: (id: string) => User | undefined;
export declare const updateUser: (userData: User) => void;
export declare const deleteUser: (id: string) => void;
