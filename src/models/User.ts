export interface IUser {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface INewUser extends IUser{
  password: string
}

export interface IUserCredentials {
  usernameOrEmail: string
  password: string
}
