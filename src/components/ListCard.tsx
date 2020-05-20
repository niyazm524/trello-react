import React from "react";
import {Paper} from "@material-ui/core";
import './ListCard.sass';
import ICard from "../models/ICard";

export default React.forwardRef(((props: {card: ICard, isDragging?: boolean, onClick: (card: ICard) => any}, ref) => (
  <Paper ref={ref} variant="elevation" elevation={props.isDragging ? 5 : 1} className="list-card" onClick={() => props.onClick(props.card)}>
    {props.card.title}
  </Paper>
)))
