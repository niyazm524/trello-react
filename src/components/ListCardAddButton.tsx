import React, {useRef, useState} from "react";
import {Button, InputBase, Paper} from "@material-ui/core";
import './ListCard.sass';
import AddIcon from "@material-ui/icons/Add";

export type ListCardAddButtonProps = {
  addNewCard: (title: string) => void
}

export default React.forwardRef(((props: ListCardAddButtonProps, ref) => {
  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const onTitleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if(newCardTitle.trim() === '') return;
      (event.target as HTMLInputElement)?.blur();
    }
  };
  const onTitleBlur = () => {
    if(newCardTitle.trim() === '') {
      setAddingCard(false);
      return;
    }
    setNewCardTitle('');
    setAddingCard(false);
    props.addNewCard(newCardTitle);
  };

  const onAddNewCardClick = () => {
    setTimeout(() => inputRef.current?.focus(), 100);
    setAddingCard(true);
  };

  return addingCard ? (
      <Paper ref={ref} variant="outlined" className="list-card">
        <InputBase
          className="list-header-title"
          inputRef={inputRef}
          placeholder="Введите заголовок карточки"
          onChange={(ev) => setNewCardTitle(ev.target.value)}
          value={newCardTitle}
          onKeyUp={onTitleKeyUp}
          onBlur={onTitleBlur}
          inputProps={{'aria-label': 'naked'}}
        />
      </Paper>
  ) : (
    <Button
      startIcon={<AddIcon/>}
      variant={"text"}
      className="list-footer-button"
      onClick={onAddNewCardClick}
    >Добавить карточку</Button>
  )
}))
