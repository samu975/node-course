import { User } from '../models/user.model';
export declare const addUser: (user: User) => void;
export declare const getUserByEmail: (email: string) => User | undefined;
export declare const getUserById: (id: string) => User | undefined;
export declare const updateUser: (user: User) => void;
export declare const deleteUser: (id: string) => void;
