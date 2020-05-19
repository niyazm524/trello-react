import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {IBoard, INewBoard, IUpdatedBoard} from "../models/Board";
import api from "../api";
import AddBoardDialog from "../components/AddBoardDialog";
import './BoardsListView.sass';
import {Link} from "react-router-dom";
import store, {showMessage} from "../store";
import EditBoardDialog from "../components/EditBoardDialog";

export default function BoardsListView() {
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogBoard, setEditDialogBoard] = useState<IBoard | null>(null)
  const loadBoards = () => api.boards.getMyBoards().then(boards => setBoards(boards.data));
  useEffect(() => {
    loadBoards().then()
  }, []);

  const onCreateBoard = async (newBoard: INewBoard) => {
    await api.boards.create(newBoard);
    await loadBoards()
  };
  const editBoard = async (id: string, updatedBoard: IUpdatedBoard) => {
    setEditDialogBoard(null)
    await api.boards.update(id, updatedBoard)
    showMessage('Доска обновлена')
    await loadBoards()
  }
  const deleteBoard = (board: IBoard) => () => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm(`Вы действительно хотите удалить доску "${board.title}"?`)) {
      api.boards.delete(board.id)
        .then(() => store.dispatch({type: 'SHOW_MESSAGE', payload: `Доска "${board.title}" удалена`}))
        .then(() => loadBoards())
    }
  }

  return (
    <Container>
      <Grid container justify={"flex-start"} alignItems={"center"} spacing={2}>
        <Grid item><Typography variant="h3">Мои доски</Typography></Grid>
        <Grid item xs={1}>
          <AddBoardDialog open={createDialogOpen} setOpen={setCreateDialogOpen} createBoard={onCreateBoard}/>
        </Grid>
      </Grid>
      <Grid container wrap="wrap" className="lists-grid">
        {
          boards.map(board => (
            <Grid key={board.id} item md={3}>
              <Card>
                <Link to={`/board/${board.id}`}>
                  <CardContent>
                    <Typography variant={"h5"}>
                      {board.title}
                    </Typography>
                    <Typography variant={"body2"}>
                      {board.description || ''}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Button color="primary" onClick={() => setEditDialogBoard(board)}>Редактировать</Button>
                  <div style={{flexGrow: 1}}/>
                  <Button color="secondary" onClick={deleteBoard(board)}>Удалить</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <EditBoardDialog board={editDialogBoard} onClose={() => setEditDialogBoard(null)} onEdit={editBoard} />
    </Container>
  )
}
