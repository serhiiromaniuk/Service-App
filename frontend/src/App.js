import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Profile from './components/Pages/Profile'
import Users from './components/Pages/Users';
import Login from './components/Pages/NewAuth/Login';
import { VerifyAuth, HandleLogin } from './components/Utils';

function App() {
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
