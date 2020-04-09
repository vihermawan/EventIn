/**
 * @author spindyzel
 * @since 28 Desember 2019
*/

import React, { Component } from 'react'
import { Router, Switch, Route, Redirect } from "react-router-dom";
import routeSources from './router-config';

class Routers extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    {routeSources.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
}

function RouteWithSubRoutes(route) {
    // console.log(route.private)
    return route.private ? (
        <PrivateRoute
            path={route.path}
        >
            <route.component routes={route.routes} />
        </PrivateRoute>
    ) : (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}  
        />
    );
}

function PrivateRoute({ children, ...rest }) {
    let isAuthenticated = false;
    if(localStorage.getItem("token") != null) isAuthenticated = true;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

function PrivatePanitiiaRoute({ children, ...rest }) {
  let isAuthenticated = false;
  if(localStorage.getItem("token") != null && localStorage.getItem("id_role" == 2)) isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard/dashboard-panitia",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default Routers;