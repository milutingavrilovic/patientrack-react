import React from 'react';
import { Route, IndexRoute } from "react-router";
import Login from "./components/auth/login";

export default (
  <Route>
    <Route exact path="/" component={Auth}/>
    <Route>
      DashBoard
    </Route>
  </Route>
);