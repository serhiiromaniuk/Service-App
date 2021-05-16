import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Profile from './Components/Pages/Profile'
import Users from './Components/Pages/Users';
import Error from './Components/Pages/Error';
import Organisation from './Components/Pages/Organisation';
import ContainerCard from './Components/Pages/Container';
import Login from './Components/Pages/Auth/Login';
import Register from './Components/Pages/Auth/Register';
import { verifyAuth, handleLogin } from './Components/Utils';

export default function App() {
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
            <Route exact path='/container'>
              {verifyAuth(ContainerCard)}
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
