import React, {useState} from 'react';
import {Button, IconButton, InputBase, Menu, Paper, MenuItem} from "@material-ui/core";
import './List.sass'
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IList from "../models/IList";

export type ListProps = {
  list: IList,
  onDelete: (list: IList) => void
  children?: React.ReactNode
}


export default React.forwardRef((({list, onDelete, children}: ListProps, ref) => {
  const [listTitle, setListTitle] = useState(list.title);
  const onTitleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      console.info(`New Title: ${listTitle}`);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onDeleteClick = () => {
    handleClose();
    onDelete(list);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Button startIcon={<AddIcon/>} variant={"text"} className="list-footer-button">Добавить карточку</Button>
      </div>
    </Paper>
  )
}))
