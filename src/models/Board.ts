import {IUser} from "./User";

interface IBaseBoard {
  title: string
  description: string | null
  author: IUser
  members: IUser[]
}

export interface IBoard extends IBaseBoard {
  id: string
}

export interface INewBoard {
  title: string
}

export interface IUpdatedBoard {
  title?: string
  description?: string
}
