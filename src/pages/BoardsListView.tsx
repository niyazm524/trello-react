import React, {useEffect, useState} from "react";
import {Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {IBoard, INewBoard} from "../models/Board";
import api from "../api";
import AddBoardDialog from "../components/AddBoardDialog";

export default function BoardsListView() {
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const loadBoards = () => api.boards.getMyBoards().then(boards => setBoards(boards.data));
  useEffect(() => { loadBoards() }, []);

  const onCreateBoard = async (newBoard: INewBoard) => {
    await api.boards.create(newBoard);
    await loadBoards()
  };

  return (
    <Container>
      <Grid container justify={"flex-start"} alignItems={"center"} spacing={2}>
        <Grid item><Typography variant="h3">Мои доски</Typography></Grid>
        <Grid item xs={1}>
          <AddBoardDialog open={createDialogOpen} setOpen={setCreateDialogOpen} createBoard={onCreateBoard}/>
        </Grid>
      </Grid>
      <Grid container wrap="wrap">
        {
          boards.map(board => (
            <Grid key={board.id} item md={3}>
              <Card>
                <CardContent>
                  <Typography variant={"h5"}>
                    {board.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}
