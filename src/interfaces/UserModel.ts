export interface IUserCredentials {
  email: string;
  password: string;
}

export interface ILoginData extends IUserCredentials {
  token: string
}
