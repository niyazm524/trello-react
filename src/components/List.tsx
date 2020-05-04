import React from 'react';
import {IconButton, InputBase, Paper} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './List.sass'

export default function List(props: {title: string}) {
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


    </Paper>
  )
}
