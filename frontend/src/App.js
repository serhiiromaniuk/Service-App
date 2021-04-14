import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
// import './components/utils';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
// import Users from './components/Auth/Users'
import Users from './components/Users';

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
