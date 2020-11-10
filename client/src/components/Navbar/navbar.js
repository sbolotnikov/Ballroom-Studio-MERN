import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import ErrorNotice from "../misc/errorNotice";
import UserContext from '../../utils/UserContext'

function Navbar() {
    const { email, setEmail, loggedIn, setLoggedIn, userId, setUserId } = useContext(UserContext);
    console.log("login status " + loggedIn);
    console.log("email  " + email);
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [emailId, setEmailId] = useState('');
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
        if (re.test(emailId.toLowerCase())) {
            console.log("username is " + emailId);
            console.log("password is " + password);

            const userLogin = {
                email: emailId,
                password: password
            };
            // after login is successful, use history.push to redirect
            API.login(userLogin).then((results) => {
                console.log(results);
                setUserId(results.data.id);
                setErrorState(false);
                setLoggedIn(true);
                setEmail(results.data.email);
                // setUserId(results.data._id);

                // setErrorState(false);
                // setLoggedIn(true);
                // setEmail(emailId)

                history.push("/member");
            })
                .catch(err => {
                    console.log(err)
                    setErrorState(`Your email or password does not match our records`);

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
                    {!loggedIn && <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" onClick={handleShowDropdown}>
                            Login
                        </Link>
                        <div className={`${showDropdown ? 'show' : ''} dropdown-menu`} aria-labelledby="navbarDropdown">
                            <form className="login px-2 py-2 dropdown-item" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="userEmail">Email</label>
                                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" name="email"
                                        onChange={event => setEmailId(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" className="form-control" id="userPassword" name="password"
                                        onChange={event => setPassword(event.target.value)} />
                                </div>
                                <div className="form-inline">
                                    <button type="submit" className="btn btn-primary">Login</button>

                                </div>
                            </form>
                            {errorstate && (<ErrorNotice message={errorstate} left={10} top={10} clearError={() => setErrorState(undefined)} />)}
                            <div>
                                <img src={process.env.PUBLIC_URL + "./imgs/google-sign-in-btn.png"} alt="Login with Google" onClick={() => {

                                    API.googleSignin().then((results) => {
                                        console.log(results);
                                        setErrorState(false);
                                        setLoggedIn(true);
                                        setEmail(results.data.email);

                                        history.push("/member");
                                    }).catch(err => {
                                        console.log(err)
                                        setErrorState(`cannot loging with Google`);

                                    });
                                }} />
                            </div>
                        </div>
                    </li> || ""}
                    {!loggedIn && <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Signup
                    </Link>
                    </li> || ""}
                    <li className="nav-item">
                        <Link to="/events" className="nav-link">
                            Events
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/steps" className="nav-link">
                            Social
                    </Link>
                  
                    </li>
                    <li className="nav-item">
                        <Link to="/DanceInspire" className="nav-link">
                            Dance Inspirations
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                    </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;