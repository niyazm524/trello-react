import axios from "./axios";
import IList from "../models/IList";
import {INewCard} from "../models/ICard";


export default {
  addCard: (boardId: string, listId: string, newCard: INewCard) =>
    axios.post<IList>(`/boards/${boardId}/lists/${listId}/cards`, newCard),
  //removeCard: (boardId: string, listId: string) => axios.delete<IBoard>(`${endpoint}/${boardId}/lists/${listId}`)
}
