import axios from "./axios";
import {IBoard, INewBoard, IUpdatedBoard} from "../models/Board";

const endpoint = '/boards';

export default {
  getMyBoards: () => axios.get<IBoard[]>(endpoint),
  getById: (id: string) => axios.get<IBoard | null>(`${endpoint}/${id}`),
  create: (newBoard: INewBoard) => axios.post<IBoard>(endpoint, newBoard),
  update: (id: string, updatedBoard: IUpdatedBoard) => axios.put<IBoard>(`${endpoint}/${id}`, updatedBoard),
  delete: (id: string) => axios.delete<void>(`${endpoint}/${id}`)
}
