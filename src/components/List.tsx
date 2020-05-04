import React from 'react';
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './List.sass'
import AddIcon from "@material-ui/icons/Add";

export default function List(props: {title: string, children?: React.ReactNode}) {
  return (
    <Paper elevation={1} className="list">
      <div className="list-header">
        <InputBase
          className="list-header-title"
          defaultValue={props.title}
          inputProps={{ 'aria-label': 'naked' }}
        />
        <IconButton aria-label="settings" size="small">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="list-content">
        {props.children}
      </div>
      <div className="list-footer">
        <Button startIcon={<AddIcon />} variant={"text"} className="list-footer-button">Добавить карточку</Button>
      </div>

    </Paper>
  )
}
