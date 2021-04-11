import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
// import './Components/utils';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Profile from './Components/Profile';
import Users from './Components/Auth/Users'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='container mt-2' style={{ marginTop: 40 }}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/profile/:name'>
            <Profile />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
