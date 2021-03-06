import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Home,
  User,
  NoMatch,
  Sidebar,
  LoginForm,
  RegisterForm,
  Logout
} from '../../components';

interface Props {}

const App = (props: Props) => {
  return (
    <div className="container-fluid">
      <div className="row layout">
        <Sidebar />
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/logout" component={Logout} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
