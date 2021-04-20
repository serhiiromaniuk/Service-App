import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Users from './components/Users';

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <Navbar />
// <div className='container mt-2' style={{ marginTop: 40 }}>
//   <Switch>
//     <Route exact path='/'>
//       <Home />
//     </Route>
//     <Route exact path='/users'>
//       <Users />
//     </Route>
//     <Route exact path='/about'>
//       <About />
//     </Route>
//     <Route exact path='/profile/:name'>
//       <Profile />
//     </Route>
//   </Switch>
// </div>
//   <Route exact path='/login'>
//       <Login />
//   </Route>