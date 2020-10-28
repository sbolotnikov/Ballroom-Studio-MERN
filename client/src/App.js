import React from "react";
// import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Checkout from "./components/Checkout";
// import NoMatch from  "./pages/NoMatch"
import NavBar from "./components/pages/Navbar";
import "./App.css";
import Home from "./components/pages/home";
import { useRoutes } from "hookrouter";
const routes = {
  "/": () => <Checkout />,
};
function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <NavBar />
      <Home/>
      <a href="/">Main Page</a>
      {routeResult}
    </div>
  );
}
// function App() {
//   return (
//     // <NavBar> </NavBar>
//     <Router>
//      <div>
//        <Switch>
//          <Route exact path="/" component = {Main}/>
//          <Route  component = {NoMatch}/>
//        </Switch>

//      </div>

//     </Router>
//   )
// }

export default App;
