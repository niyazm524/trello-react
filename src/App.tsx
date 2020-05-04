import React, { Suspense, lazy } from 'react';
import AppHeader from "./components/AppHeader";
import {BrowserRouter, Route, Switch} from "react-router-dom"


export default function App() {

  return (
    <BrowserRouter>
      <div>
        <AppHeader/>
        <main>
          <Suspense fallback={
            // <div style={{position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, transform: 'translate(-30px, -30px)'}}>
            //     <CircularProgress disableShrink size={60} />
            // </div>
            <div>Загрузка...</div>
          }>
            <Switch>
              <Route exact path="/" component={lazy(() => import('./pages/BoardView'))} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}
