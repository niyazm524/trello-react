import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import {Props} from "../containers/MessageToast";



export default function MessageToast(props: Props) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.hideToast();
  };

  return (
    <Snackbar open={props.isEnabled} autoHideDuration={props.duration} onClose={handleClose}>
      <MuiAlert elevation={6} variant={"filled"} severity={props.type || 'info'} onClose={handleClose}>
        { props.message }
      </MuiAlert>
    </Snackbar>
  )
}
