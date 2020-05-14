import React, {useState} from 'react';
import {IconButton, InputBase, Menu, Paper, MenuItem} from "@material-ui/core";
import './List.sass'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IList from "../models/IList";
import ListCardAddButton from "./ListCardAddButton";
import {INewCard} from "../models/ICard";

export type ListProps = {
  list: IList
  onDelete: (list: IList) => void
  onAddCard: (list: IList, card: INewCard) => void
  children?: React.ReactNode
}


export default React.forwardRef((({list, onDelete, onAddCard, children}: ListProps, ref) => {
  const [listTitle, setListTitle] = useState(list.title);
  const onTitleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      console.info(`New Title: ${listTitle}`);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const onDeleteClick = () => {
    handleClose();
    onDelete(list);
  };

  const addNewCard = (title: string) => onAddCard(list, {title});

  return (
    <Paper elevation={1} className="list" ref={ref}>
      <div className="list-header">
        <InputBase
          id="input-title"
          className="list-header-title"
          defaultValue={list.title}
          placeholder="Введите имя списка"
          onChange={(ev) => setListTitle(ev.target.value)}
          onKeyUp={onTitleKeyUp}
          inputProps={{'aria-label': 'naked'}}
        />
        <IconButton aria-label="settings" size="small" onClick={handleClick}>
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
            <MenuItem onClick={onDeleteClick}>
              Удалить
            </MenuItem>
        </Menu>
      </div>
      <div className="list-content">
        {children}
      </div>
      <div className="list-footer">
        <ListCardAddButton addNewCard={addNewCard}/>
      </div>
    </Paper>
  )
}))
