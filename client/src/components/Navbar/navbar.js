import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

    function handleShowDropdown() {
        setShowDropdown(!showDropdown)
    }

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#152a61" }}>
            <Link to="/" className="navHeader">
                MERN Ballroom Studio
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <span className="nav-item"><i class="fas fa-music"></i></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown" onClick={handleShowDropdown}>
                        <Link to="#" className="nav-link dropdown-toggle">
                            Login
                        </Link>
                        <div className={`${showDropdown ? 'show' : ''} dropdown-menu`} aria-labelledby="navbarDropdown">
                            <form className="login px-2 py-2 dropdown-item">
                                <div className="form-group">
                                    <label for="userEmail">Email</label>
                                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label for="userPassword">Password</label>
                                    <input type="password" className="form-control" id="userPassword" />
                                </div>
                                <div className="form-inline">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <a href="signup.html" role="button" className="btn btn-primary mx-2">Register</a>
                                </div>
                            </form>
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