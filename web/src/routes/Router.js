import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './Router.css';
import Login from './Login/Login.component';
import Signup from './Signup/Signup.component';
import Home from './Home/Home.component';
import Group from './Group/Group.component';
import Receipt from './Receipt/Receipt.component';

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/groups/:groupId" component={Group} />} />
          <Route exact path="/receipts" component={Receipt} />} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;
