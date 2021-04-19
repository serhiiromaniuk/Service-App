import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
// import './components/utils';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Profile from './components/Pages/Profile';
// import Users from './components/Auth/Users'
import Users from './components/Users';
import Login from './components/Pages/Auth/Login'
import CustomBar from './components/CustomAppBar';

function App() {
  return (
       <CustomBar />
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