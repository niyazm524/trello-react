import ICard, {IUpdatedCard} from "../models/ICard";
import axios from "./axios";

export default {
  update: (listId: string, id: string, updatedCard: IUpdatedCard) => axios.put<ICard>(`/boards/1/lists/${listId}/cards/${id}`, updatedCard)
}
