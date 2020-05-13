import ICard from "./ICard";

export default interface IList {
  id: string
  title: string
  cards: ICard[]
}

export interface INewList {
  title: string
}
