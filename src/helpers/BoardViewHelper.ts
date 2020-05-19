import {DraggableLocation, DropResult} from "react-beautiful-dnd";
import ICard from "../models/ICard";
import IList from "../models/IList";
import {IBoard} from "../models/Board";
import api from "../api";

export function onDragEndHelper(
  board: IBoard | null | undefined,
  setBoard: (newBoard: IBoard) => void,
  {source, destination}: DropResult
): void {
  if (!destination || !board) return;

  const sInd: number = +source.droppableId;
  const dInd: number = +destination.droppableId;

  const oldState = {...board, lists: board.lists.map(list => ({...list, cards: list.cards.map(card => ({...card}))}))}
  if (sInd === dInd) {
    const items: ICard[] = reorder(board.lists[sInd], source.index, destination.index);
    const newState: IList[] = [...board.lists];
    newState[sInd].cards = items;
    api.lists.reorderCard(board.id, oldState.lists[sInd].id, oldState.lists[sInd].cards[source.index].id, destination.index)
      .catch(() => {
        setTimeout(() => setBoard(oldState), 400)
      })
    setBoard({...board, lists: newState});
  } else {
    const result = move(board.lists[sInd], board.lists[dInd], source, destination);
    const newState: IList[] = [...board.lists];
    newState[sInd].cards = result[sInd];
    newState[dInd].cards = result[dInd];
    api.lists.moveCard(board.id, oldState.lists[sInd].id, oldState.lists[sInd].cards[source.index].id, oldState.lists[dInd].id, destination.index)
      .catch(() => {
        setTimeout(() => setBoard(oldState), 400)
      })
    setBoard({...board, lists: newState});
  }
}

const reorder = (list: IList, startIndex: number, endIndex: number) => {
  const result = Array.from(list.cards);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source: IList, destination: IList, droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source.cards);
  const destClone = Array.from(destination.cards);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: ICard[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
