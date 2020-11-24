
import React, { useState } from "react";
import Home from "./pages/Home/index.js";
// import Checkout from './components/Checkout';
// eslint-disable-next-line
import './App.css';
import './css/body.css';
import './css/heading.css';
import './css/styles.css';
import About from './pages/About';
import Events from './pages/Events';
import Payments from './pages/Payments';
import Invoices from './pages/Invoices';
import EditInvoice from './pages/EditInvoice';
import Signup from './pages/Signup';
import Steps from './pages/Steps';
import MemberPage from './pages/MemberPage';
import UserContext from "./utils/UserContext";
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import DanceInspire from "./pages/Dance";
import PasswordRecover from "./pages/Recover";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn]= useState(false);
  const [userId, setUserId]= useState("");
  const [invoiceId, setInvoiceId]= useState("");
  return (
    
    <div>
    {/* <Navbar/> */}
      <Router>
        <UserContext.Provider value={{ email, setEmail, loggedIn, setLoggedIn, userId, setUserId, invoiceId, setInvoiceId }}>
          <Route exact path="/home" component={Home} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/member" /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/steps" component={Steps} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/payment" component={Payments} />
          <Route exact path="/invoices" component={Invoices} />
          <Route exact path="/editInvoice" component={EditInvoice} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/member" component={MemberPage} />
          <Route exact path= "/DanceInspire" component={DanceInspire}/>
          <Route exact path="/password" component={PasswordRecover} />
          <Route exact path="/passChange" component={ChangePassword} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

