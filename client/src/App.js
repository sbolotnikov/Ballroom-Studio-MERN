
import React from 'react';
import Home from "./pages/Home";
// import Checkout from './components/Checkout';
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
import Splash from './pages/Splash';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </div>
  );
}

export default App;

