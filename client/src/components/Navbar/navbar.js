import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import ErrorNotice from "../misc/errorNotice";

function Navbar() {
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorstate, setErrorState] = useState(false);

    // use history to redirect after login
    const history = useHistory();

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

    function handleShowDropdown() {
        setShowDropdown(!showDropdown)
    }

    function handleLogin(event) {
        event.preventDefault();

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.toLowerCase())) {
            console.log("username is " + email);
            console.log("password is " + password);

            const userLogin = {
                email: email,
                password: password
            };
            // after login is successful, use history.push to redirect
            API.login(userLogin).then(() => {
                setErrorState(false);
                history.push("/member");
            })
                .catch(err => {
                    console.log(err.response.data)
                    setErrorState(`<p>Status${err.response.status}</p> <br /><h3>${err.response.data} <br /> Your email or password does not match our records</h3>`);

                });
        } else {
            setErrorState("bad email input");
        }
    };




    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#152a61" }}>
            <Link to="/" className="navHeader">
                MERN Ballroom Studio
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <span className="nav-item"><i className="fas fa-music"></i></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" onClick={handleShowDropdown}>
                            Login
                        </Link>
                        <div className={`${showDropdown ? 'show' : ''} dropdown-menu`} aria-labelledby="navbarDropdown">
                            <form className="login px-2 py-2 dropdown-item" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="userEmail">Email</label>
                                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp"  name="email"
                                        onChange={event => setEmail(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" className="form-control" id="userPassword" name="password"
                                        onChange={event => setPassword(event.target.value)} />
                                </div>
                                <div className="form-inline">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    {/* <Link to="/signup" className="nav-link"> Signup </Link> */}
                                    {/* <a href="signup.html" role="button" className="btn btn-primary mx-2">Register</a> */}
                                </div>
                            </form>
                            {errorstate && ( <ErrorNotice message={errorstate} clearError={() => setErrorState(undefined)} /> )}
                            <div>
                                <Link to="/auth/google">
                                    <img src={process.env.PUBLIC_URL + "./imgs/google-sign-in-btn.png"} alt="Login with Google" />
                                </Link>
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