import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Profile from './components/Pages/Profile'
import Users from './components/Pages/Users';
import Error from './components/Pages/Error';
import Organisation from './components/Pages/Organisation';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { verifyAuth, handleLogin } from './components/Utils';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {
              // Main Pages 
            }
            <Route exact path='/'>
              {verifyAuth(Home)}
            </Route>
            <Route exact path='/users'>
              {verifyAuth(Users)}
            </Route>
            <Route exact path='/about'>
              {verifyAuth(About)}
            </Route>
            <Route exact path='/profile'>
              {verifyAuth(Profile)}
            </Route>
            <Route exact path='/organisation'>
              {verifyAuth(Organisation)}
            </Route>

            {
              // Auth Pages 
            }
            <Route exact path='/login'>
              {handleLogin(Login)}
            </Route>
            <Route exact path='/register'>
              {handleLogin(Register)}
            </Route>

            {
              // Middlware Pages 
            }
            <Route exact path='/error'>
              {verifyAuth(Error)}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
