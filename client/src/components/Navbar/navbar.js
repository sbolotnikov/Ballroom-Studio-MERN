import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import UserContext from '../../utils/UserContext';
import ProfilePhoto from '../ProfilePhoto';
import Login from '../Login';

function Navbar(props) {
    const {setEmail, loggedIn, setLoggedIn, setUserId } = useContext(UserContext);
    // console.log("login status " + loggedIn);
    // console.log("email  " + email);
    const [isNavCollapsed, setIsNavCollpased] = useState(true);

    // use history to redirect after login
    const history = useHistory();

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

    function handleLogout() {
        API.logout().then((results) => {
            setLoggedIn(false);
            setEmail("");
            setUserId("");
            // console.log("login status after logout " + loggedIn);
            // console.log("email  " + email);
            console.log(results);
            history.push("/home");
        })
            .catch(err => {
                console.log(err)
            });
    }

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
                        <Login />
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
                        <Link to="/social" className="nav-link">
                            Social
                    </Link>
                    </li>
                    {loggedIn ? <li className="nav-item">
                        <Link to="" className="nav-link" onClick={handleLogout} >
                            Logout
                        </Link>
                    </li> : <div></div>}
                </ul>
            </div>
            {loggedIn && <ProfilePhoto profilePhotoUrl={props.profile}></ProfilePhoto>}
        </nav>
    );
}

export default Navbar;