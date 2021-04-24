import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Profile from './components/Pages/Profile'
import Users from './components/Pages/Users';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
