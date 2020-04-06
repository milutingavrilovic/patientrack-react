import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Themes from "./themes";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import store from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline/>
        <App/>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
