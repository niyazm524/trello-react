import {Redirect, Route, RouteProps} from "react-router-dom";
import UserLogonStateConnector from "../containers/UserLogonStateConnector"
import React from "react";

export type PrivateRouteProps = RouteProps & { isUserLogon: boolean }

export default UserLogonStateConnector((
  {
    component: Component,
    isUserLogon,
    ...rest
  }: PrivateRouteProps
) => {
  return (
    <Route {...rest} render={({location}) =>
      // @ts-ignore
      isUserLogon ? <Component /> : <Redirect to={
        {pathname: '/sign-in', state: {from: location}}
      }/>}>
    </Route>
  )
})
