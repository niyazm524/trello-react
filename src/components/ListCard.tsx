import React from "react";
import {Paper} from "@material-ui/core";
import './ListCard.sass';

export default React.forwardRef(((props: {title: string, isDragging?: boolean}, ref) => (
  <Paper ref={ref} variant="elevation" elevation={props.isDragging ? 5 : 1} className="list-card">
    {props.title}
  </Paper>
)))
