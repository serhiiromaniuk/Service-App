import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Profile from './components/Pages/Profile'
import Users from './components/Pages/Users';
import Error from './components/Pages/Error';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { VerifyAuth, HandleLogin } from './components/Utils';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {VerifyAuth(Home)}
            </Route>
            <Route exact path='/users'>
              {VerifyAuth(Users)}
            </Route>
            <Route exact path='/about'>
              {VerifyAuth(About)}
            </Route>
            <Route exact path='/profile'>
              {VerifyAuth(Profile)}
            </Route>
            <Route exact path='/login'>
              {HandleLogin(Login)}
            </Route>
            <Route exact path='/register'>
              {HandleLogin(Register)}
            </Route>
            <Route exact path='/Error'>
              {VerifyAuth(Error)}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
