export default interface ICard {
  id: string
  title: string
  description: string
}

export interface INewCard {
  title: string
}

export interface IUpdatedCard {
  title?: string
  description?: string
}
