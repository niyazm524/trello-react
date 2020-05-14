import React, {useEffect, useState} from "react"
import "./BoardView.sass"
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import IList from "../models/IList";
import {Container, Grid, Toolbar, Typography} from "@material-ui/core";
import List from "../components/List";
import ListCard from "../components/ListCard";
import {useParams} from "react-router-dom";
import {IBoard} from "../models/Board";
import api from "../api";
import LastListAddButton from "../components/LastListAddButton";
import {onDragEndHelper} from "../helpers/BoardViewHelper";
import {INewCard} from "../models/ICard";


export default function BoardView() {
  const {id: boardId} = useParams();
  const [board, setBoard] = useState<IBoard | null>();
  const loadBoard = () => api.boards.getById(boardId).then(({data: board}) => setBoard(board));

  useEffect(() => {
    loadBoard()
    // eslint-disable-next-line
  }, []);

  const onDragEnd = (result: DropResult) => onDragEndHelper(board, setBoard, result);

  const addNewList = (title: string) => {
    api.boards.addList(boardId, {title})
      .then(({data: board}) => setBoard(board))
  };

  const deleteList = (list: IList) => {
    api.boards.removeList(boardId, list.id)
      .then(({data: board}) => setBoard(board))
  };

  const addCard = (list: IList, newCard: INewCard) => {
    if (!board) return;
    api.lists.addCard(boardId, list.id, newCard)
      .then(({data: changed}) => {
        setBoard({
          ...board,
          lists: board?.lists
            .map(listIter => listIter.id === changed.id ? changed : listIter)
        })
      });
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
                        <List ref={provided.innerRef} list={iList} onDelete={deleteList}
                              onAddCard={addCard} {...provided.droppableProps}>
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
            <LastListAddButton addNewList={addNewList}/>

          </Grid>
        </Grid>
      </Container>

    </div>
  )
}
