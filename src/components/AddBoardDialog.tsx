import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {INewBoard} from "../models/Board";
import {Add as AddIcon} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

export type AddBoardDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  createBoard: (newBoard: INewBoard) => void
}

export default function AddBoardDialog({open, setOpen, createBoard}: AddBoardDialogProps) {
  const [title, setTitle] = useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => {
    handleClose();
    createBoard({title});
  };

  return (
    <div>
      <IconButton size={"medium"} color="secondary" onClick={handleClickOpen}><AddIcon /></IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Назовите новую доску
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            label="Название"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCreate} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
