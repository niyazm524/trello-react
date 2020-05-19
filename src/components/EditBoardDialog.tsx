import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {IBoard, IUpdatedBoard} from "../models/Board";
import {showError} from "../store";


export type EditBoardDialogProps = {
  board: IBoard | null
  onClose: () => any
  onEdit: (id: string, updatedBoard: IUpdatedBoard) => any
}

export default function EditBoardDialog(props: EditBoardDialogProps) {
  const [title, setTitle] = useState<string>(props.board != null ? props.board.title : '');
  const [description, setDescription] = useState(props.board?.description || '');

  useEffect(() => setTitle(props.board?.title || ''), [props.board])
  useEffect(() => setDescription(props.board?.description || ''), [props.board])

  const onEdit = () => {
    if(props.board == null) return
    if(title.trim() === '') {
      showError("Название доски не может быть пустым :(")
      return
    }
    props.onEdit(props.board.id, {title, description})
  }
  return (<Dialog open={props.board != null} onClose={props.onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Изменение доски</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        label="Название"
        fullWidth
      />
      <TextField
        margin="dense"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        label="Описание"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Отмена
      </Button>
      <Button onClick={onEdit} color="primary">
        Изменить
      </Button>
    </DialogActions>
  </Dialog>)
}
