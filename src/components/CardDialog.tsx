import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import {IBoard} from "../models/Board";
import ICard from "../models/ICard";
import api from "../api";


export type CardDialogProps = {
  board?: IBoard | null
  indices?: {listIndex: number, cardIndex: number} | null
  onClose: () => any
}

export default function CardDialog({board, indices, onClose}: CardDialogProps) {
  const getCard = useCallback(() => indices && board?.lists[indices.listIndex].cards[indices.cardIndex], [board, indices])
  const [card, setCard] = useState<ICard | null>(getCard() || null)
  // const [description, setDescription] = useState(card?.description || '')
  useEffect(() => setCard(getCard() || null), [getCard])
  const updateDescription = (newDesc: string) => {
    if(!card || !indices || !board) return
    api.cards.update(board?.lists[indices.listIndex]?.id, card.id, {description: newDesc})
      .then(({data}) => setCard(data))
  }

  return (<Dialog open={card != null} onClose={onClose} aria-labelledby="form-dialog-card" fullWidth maxWidth={"md"}>
    <DialogTitle id="form-dialog-card">{card?.title}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        multiline
        defaultValue={card?.description || ''}
        onBlur={(event) => updateDescription(event.target.value)}
        label="Описание карточки"
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>)
}
