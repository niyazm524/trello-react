import axios from "./axios";
import IList from "../models/IList";
import {INewCard} from "../models/ICard";


export default {
  addCard: (boardId: string, listId: string, newCard: INewCard) =>
    axios.post<IList>(`/boards/${boardId}/lists/${listId}/cards`, newCard),

  reorderCard: (boardId: string, listId: string, cardId: string, newIndex: number) =>
    axios.post<IList>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/reorder`, {newIndex}),

  moveCard: (boardId: string, listId: string, cardId: string, destListId: string, newIndex: number) =>
    axios.post<IList>(`/boards/${boardId}/lists/${listId}/cards/${cardId}/move`, {destListId, newIndex}),


  //removeCard: (boardId: string, listId: string) => axios.delete<IBoard>(`${endpoint}/${boardId}/lists/${listId}`)
}
