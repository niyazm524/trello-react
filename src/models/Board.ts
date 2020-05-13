import {IUser} from "./User";
import IList from "./IList";

interface IBaseBoard {
  title: string
  description: string | null
  author: IUser
  members: IUser[]
}

export interface IBoard extends IBaseBoard {
  id: string
  lists: IList[]
}

export interface INewBoard {
  title: string
}

export interface IUpdatedBoard {
  title?: string
  description?: string
}
