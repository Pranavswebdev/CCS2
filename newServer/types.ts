export interface CreateUserRequestBody {
  email: string;
  name: string;
  password: string;

}

export interface LoginUserRequestBody {
  email: string;
  password: string;

}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}