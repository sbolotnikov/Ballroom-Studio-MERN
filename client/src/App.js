
import React from 'react';
import Home from "./pages/Home";

import {HashRouter as Router, Route} from 'react-router-dom';

// import Checkout from './components/Checkout';
import './App.css';

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
