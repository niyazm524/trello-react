import {Redirect, Route, RouteProps} from "react-router-dom";
import UserLogonStateConnector from "../containers/UserLogonStateConnector"
import React from "react";

export type AnonRouteProps = { isUserLogon: boolean } & RouteProps

export default UserLogonStateConnector((
  {
    component: Component,
    isUserLogon,
    ...rest
  }: AnonRouteProps
) => {
  return (
    <Route {...rest} render={({location}) =>
      // @ts-ignore
      !isUserLogon ? <Component /> : <Redirect to={
        {pathname: '/', state: {from: location}}
      }/>}>
    </Route>
  )
})
