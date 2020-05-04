import ICard from "./ICard";

export default interface IList {
  id: number
  title: string
  cards: ICard[]
}
