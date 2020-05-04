import React from "react";
import {Paper} from "@material-ui/core";
import './ListCard.sass';

export default function ListCard(props: {title: string}) {
  return (
    <Paper variant="elevation" elevation={1} className="list-card">
      {props.title}
    </Paper>
  )
}
