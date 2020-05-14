import React, { Suspense } from 'react';
import AppHeader from "./containers/AppHeader";
import {BrowserRouter} from "react-router-dom"
import Routes from "./routes";
import {Snackbar} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";


export default function App() {

  return (
    <BrowserRouter>
      <div>
        <AppHeader />
        <main>
          <Suspense fallback={
            // <div style={{position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, transform: 'translate(-30px, -30px)'}}>
            //     <CircularProgress disableShrink size={60} />
            // </div>
            <div>Загрузка...</div>
          }>
            <Routes/>
          </Suspense>
        </main>
        {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
        {/*  <Alert onClose={handleClose} severity="success">*/}
        {/*    This is a success message!*/}
        {/*  </Alert>*/}
        {/*</Snackbar>*/}
      </div>
    </BrowserRouter>
  );
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
