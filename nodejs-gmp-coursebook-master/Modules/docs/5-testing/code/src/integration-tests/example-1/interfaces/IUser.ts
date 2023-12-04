export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IUserExtended extends IUser {
  id: string;
  password: string;
}
