import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import API from '../../utils/API';
import ErrorNotice from "../misc/errorNotice";


function Navbar() {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const [isFormCollapsed, setIsFormCollpased] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorstate, setErrorState] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
        if (re.test(username.toLowerCase())) {
            console.log("username is " + username);
            console.log("password is " + password);

            API.postLogin({ email: username, id: password })
                .then(result => {
                    console.log(result);
                    setErrorState(false);
                    // () => dispatch({ type: "login" });
                    //   change global state to login
                })
                .catch(err => {
                    console.log(err.response.data)
                    // err.response.data && 
                    setErrorState(`<p>Status${err.response.status}</p> <br /><h3>${err.response.data}</h3>` );
                    
                });




        } else {
            console.log("bad email input")
        }
    };

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }
    function handleFormCollpase() {
        setIsFormCollpased(!isFormCollapsed)
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#152a61" }}>
            <Link to="/" className="navHeader">
                MERN Ballroom Studio
			</Link>
            <button className="navbar-toggler nav-item" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <span className="navItem"><i class="fas fa-music"></i></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item mr-3 d-none d-lg-block">
                        <div className={"dropdown" + (!isFormCollapsed ? " show" : "")}>
                            <button className="navItem onHover dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ backgroundColor: "#152a61",color:"#faa65c"}} onClick={handleFormCollpase}>
                                Login
                            </button>
                            <div className={"dropdown-menu dropdown-menu-right" + (!isFormCollapsed ? " show" : "")} aria-labelledby="dropdownMenuButton">
                                <form className="login px-2 py-2" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="navItem onHover" for="userEmail">Email</label>
                                        <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" onChange={e => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="navItem onHover" for="userPassword">Password</label>
                                        <input type="password" className="form-control" id="userPassword" onChange={e => setPassword(e.target.value)} />
                                    </div>




                                    <div className="form-inline">
                                        <button type="submit" className="nav-item" style={{ backgroundColor: "#152a61", border: "0" }}>Login</button>
                                        <a href="signup.html" role="button" className="nav-item mx-2" style={{ backgroundColor: "#152a61" }}>Register</a>
                                    </div>                            
                                </form>
                                {errorstate && ( <ErrorNotice message={errorstate} clearError={() => setErrorState(undefined)} /> )}
                                <div>
                                    <Link to="/auth/google">
                                        <img src={process.env.PUBLIC_URL + "./imgs/google-sign-in-btn.png"} alt="Login with Google" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Signup
                            </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/events" className="nav-link">
                            Events
                            </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/social" className="nav-link">
                            Social
                            </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/payment" className="nav-link">
                            Payment
                            </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;