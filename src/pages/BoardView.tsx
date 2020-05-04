import React, {useState} from "react"
import "./BoardView.sass"
import {DragDropContext, Draggable, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import IList from "../models/IList";
import ICard from "../models/ICard";
import {Container, Grid, Toolbar} from "@material-ui/core";
import List from "../components/List";
import ListCard from "../components/ListCard";

function createList(id: number): IList {
  return {
    id,
    title: `List #${id}`,
    cards: Array.from({length: 4}, (v, k) => k)
      .map((_, index) =>
        ({id: parseInt(`${id}0${index}`, 10), title: `Card #${id}_${index}`})
      )
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

export default function BoardView() {
  const [state, setState] = useState([createList(1), createList(2)]);

  function onDragEnd({source, destination}: DropResult): void {
    if (!destination) return;

    const sInd: number = +source.droppableId;
    const dInd: number = +destination.droppableId;

    if (sInd === dInd) {
      const items: ICard[] = reorder(state[sInd], source.index, destination.index);
      const newState: IList[] = [...state];
      newState[sInd].cards = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState: IList[] = [...state];
      newState[sInd].cards = result[sInd];
      newState[dInd].cards = result[dInd];
      setState(newState);
    }
  }

  return (
    <div>
      <Toolbar className="board-toolbar" variant={"dense"}>

      </Toolbar>
      <Container maxWidth={"xl"} className="board-container">
        <Grid className="board-container-grid" container>
          <DragDropContext onDragEnd={onDragEnd}>
            {
              state.map((iList, index) => (
                <Droppable key={iList.id} droppableId={`${index}`}>
                  {
                    (provided, snapshot) => (
                      <Grid item className="grid-item">
                        <List ref={provided.innerRef} {...iList} {...provided.droppableProps}>
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
        </Grid>
      </Container>

    </div>
  )
}
