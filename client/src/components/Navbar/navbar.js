import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollpased] = useState(true);

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

	return (
		<nav className="navbar navbar-expand-lg" style={{backgroundColor: "#152a61"}}>
			<Link to="/" className="navHeader onHover">
				MERN Ballroom Studio
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <span className="navItem"><i class="fas fa-music"></i></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                {/* <li className="nav-item mr-3 d-none d-lg-block">
                            <div className="dropdown show">
                                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                                </button>
                                <div className="dropdown-menu dropdown-menu-right show" aria-labelledby="dropdownMenuButton">
                                    <form className="login px-2 py-2">
                                        <div className="form-group">
                                            <label for="userEmail">Email</label>
                                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label for="userPassword">Password</label>
                                            <input type="password" className="form-control" id="userPassword" />
                                        </div>
                                        <div className="form-inline">
                                            <button type="submit" className="btn btn-danger">Login</button>
                                            <a href="signup.html" role="button" className="btn btn-danger mx-2">Register</a>
                                        </div>
                                    </form>
                                            <div>
                                                <Link to="/auth/google">                                           
                                                    <img src={process.env.PUBLIC_URL+"./imgs/google-sign-in-btn.png"} alt="Login with Google" />
                                                </Link>
                                            </div>
                                </div>
                            </div>
                        </li> */}
                <li className="">
                    <Link to="/login" className={location.pathname==="/login" ? "navItem onHover" : "navItem onHover"}>
                        Login
                    </Link>
                </li>
                <li className="">
                    <Link to="/signup" className={location.pathname==="/signup" ? "navItem onHover" : "navItem onHover"}>
                        Signup
                    </Link>
                </li>
                <li className="">
                    <Link to="/events" className={location.pathname==="/events" ? "navItem onHover" : "navItem onHover"}>
                       Events
                    </Link>
                </li>
                <li className="">
                    <Link to="/social" className={location.pathname==="/social" ? "navItem onHover" : "navItem onHover"}>
                       Social
                    </Link>
                </li>
                <li className="">
                    <Link to="/payment" className={location.pathname==="/payment" ? "navItem onHover" : "navItem onHover"}>
                        Payment
                    </Link>
                </li>
                </ul>
            </div>
		</nav>
	);
}

export default Navbar;