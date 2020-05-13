import {Switch} from "react-router-dom";
import React, {lazy} from "react";
import PrivateRoute from "./PrivateRoute";
import AnonRoute from "./AnonRoute";


export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={lazy(() => import('../pages/BoardsListView'))} />
      <PrivateRoute path="/board/:id" component={lazy(() => import('../pages/BoardView'))} />
      <AnonRoute path="/sign-up" component={lazy(() => import('../pages/SignUp'))} />
      <AnonRoute path="/sign-in" component={lazy(() => import('../pages/SignIn'))} />
    </Switch>
  )
}

