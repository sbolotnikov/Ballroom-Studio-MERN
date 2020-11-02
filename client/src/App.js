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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (

    // <div className="App">
    
    <div>
    {/* <Navbar/> */}
      <Router>
        <div>
          <Switch>
        <Route exact path="/" component={Splash} />
        <Route  path="/login" component={Login} />
        <Route  path="/signup" component={Signup} />
        <Route  path="/social" component={Social} />
        <Route  path="/payment" component={Payment} />
        <Route  path="/events" component={Events} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

