import React, {useEffect, useState} from "react"
import "./BoardView.sass"
import {DragDropContext, Draggable, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import IList from "../models/IList";
import ICard from "../models/ICard";
import {Container, Grid, Toolbar, Typography} from "@material-ui/core";
import List from "../components/List";
import ListCard from "../components/ListCard";
import {useParams} from "react-router-dom";
import {IBoard} from "../models/Board";
import api from "../api";
import LastListAddButton from "../components/LastListAddButton";


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

export default function BoardView() {
  const {id: boardId} = useParams();
  const [board, setBoard] = useState<IBoard | null>();
  const loadBoard = () => api.boards.getById(boardId).then(({data: board}) => setBoard(board));

  useEffect(() => {loadBoard()}, []);

  function onDragEnd({source, destination}: DropResult): void {
    if (!destination || !board) return;

    const sInd: number = +source.droppableId;
    const dInd: number = +destination.droppableId;

    if (sInd === dInd) {
      const items: ICard[] = reorder(board.lists[sInd], source.index, destination.index);
      const newState: IList[] = [...board.lists];
      newState[sInd].cards = items;
      setBoard({...board, lists: newState});
    } else {
      const result = move(board.lists[sInd], board.lists[dInd], source, destination);
      const newState: IList[] = [...board.lists];
      newState[sInd].cards = result[sInd];
      newState[dInd].cards = result[dInd];
      setBoard({...board, lists: newState});
    }
  }

  const addNewList = (title: string) => {
    api.boards.addList(boardId, {title})
      .then(({data: board}) => setBoard(board))
  };

  const deleteList = (list: IList) => {
    api.boards.removeList(boardId, list.id)
      .then(({data: board}) => setBoard(board))
  };


  return (
    <div>
      <Toolbar className="board-toolbar" variant={"dense"}>
        <Typography variant={"h6"} className="board-title">{board?.title}</Typography>
      </Toolbar>
      <Container maxWidth={"xl"} className="board-container">
        <Grid className="board-container-grid" container>
          <DragDropContext onDragEnd={onDragEnd}>
            {
              board?.lists?.map((iList, index) => (
                <Droppable key={iList.id} droppableId={`${index}`}>
                  {
                    (provided, snapshot) => (
                      <Grid item className="grid-item">
                        <List ref={provided.innerRef} list={iList} onDelete={deleteList} {...provided.droppableProps}>
                          {iList.cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={`${iList.id}_${card.id}`} index={index}>
                              {
                                (provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <ListCard isDragging={snapshot.isDragging} {...card}/>
                                  </div>
                                )
                              }
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </List>
                      </Grid>
                    )
                  }
                </Droppable>
              ))
            }
          </DragDropContext>
          <Grid item className="grid-item grid-item-last">
            <LastListAddButton addNewList={addNewList} />

          </Grid>
        </Grid>
      </Container>

    </div>
  )
}
