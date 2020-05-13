import axios from "./axios";
import {IBoard, INewBoard, IUpdatedBoard} from "../models/Board";
import {INewList} from "../models/IList";

const endpoint = '/boards';

export default {
  getMyBoards: () => axios.get<IBoard[]>(endpoint),
  getById: (id: string) => axios.get<IBoard | null>(`${endpoint}/${id}`),
  create: (newBoard: INewBoard) => axios.post<IBoard>(endpoint, newBoard),
  update: (id: string, updatedBoard: IUpdatedBoard) => axios.put<IBoard>(`${endpoint}/${id}`, updatedBoard),
  delete: (id: string) => axios.delete<void>(`${endpoint}/${id}`),

  addList: (boardId: string, newList: INewList) => axios.post<IBoard>(`${endpoint}/${boardId}/lists`, newList),
  removeList: (boardId: string, listId: string) => axios.delete<IBoard>(`${endpoint}/${boardId}/lists/${listId}`)
}
