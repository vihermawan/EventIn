import React, { Component } from 'react'
import { Router, Switch, Route } from "react-router-dom";
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
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}  
        />
    );
}

export default Routers;