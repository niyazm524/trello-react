import React, {useState} from 'react';
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import './List.sass'
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export type LastListAddButtonProps = { addNewList: (title: string) => void }

export default React.forwardRef(((props: LastListAddButtonProps, ref) => {
  const [addingNewColumn, setAddingNewColumn] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const onTitleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const title = listTitle;
      setListTitle('');
      document.getElementById('input-title')?.blur();
      props.addNewList(title);
    }
  };
  const onTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if(listTitle.trim() === '') return;
    setListTitle('');
    props.addNewList(listTitle);
  };
  const onAddColumnClick = () => {
    setAddingNewColumn(true);
    setTimeout(() => {
      document.getElementById('input-title')?.focus();
    }, 100)
  };

  return (
    <Paper elevation={1} className="list" ref={ref}>
      {
        addingNewColumn ? (
          <Button
            onClick={onAddColumnClick}
            className="btn-add-column"
            startIcon={<AddIcon/>}
          >Добавить колонку</Button>
        ) : (
          <div className="list-header">
            <InputBase
              id="input-title"
              className="list-header-title"
              placeholder="Введите имя списка"
              value={listTitle}
              onChange={(ev) => setListTitle(ev.target.value)}
              onKeyUp={onTitleKeyUp}
              onBlur={onTitleBlur}
              inputProps={{'aria-label': 'naked'}}
            />
            <IconButton aria-label="settings" size="small">
              <MoreVertIcon/>
            </IconButton>
          </div>
        )
      }

      {/*<div className="list-footer">*/}
      {/*  <Button startIcon={<AddIcon/>} variant={"text"} className="list-footer-button">Добавить карточку</Button>*/}
      {/*</div>*/}
    </Paper>
  )
}))
