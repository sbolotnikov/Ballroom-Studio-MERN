
import React from 'react';
import Home from "./pages/Home/index.js";
// import Checkout from './components/Checkout';
// eslint-disable-next-line
import logo from './logo.svg';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import './App.css';
import './css/body.css';
import './css/heading.css';
import './css/styles.css';
import Events from './pages/Events';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Signup from './pages/Signup';
import Social from './pages/Social';
import { HashRouter as Router, Route } from 'react-router-dom';
// import populateTab from './db-seed'
// console.log(populateTab());

function App() {
  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/social" component={Social} />
    </Router>
  </div>
  );
}

export default App;

