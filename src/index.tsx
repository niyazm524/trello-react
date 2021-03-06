import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CssBaseline} from "@material-ui/core";
import {Provider} from 'react-redux';
import store from './store';
import init from "./authentication";

init();

ReactDOM.render(
  <div>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
