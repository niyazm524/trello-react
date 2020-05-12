interface IUserBase {
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface IUser extends IUserBase {
  id: string
}

export interface INewUser extends IUserBase{
  password: string
}

export interface IUserCredentials {
  usernameOrEmail: string
  password: string
}
