import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollpased] = useState(true);

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			<Link to="/" className="navbar-brand font-weight-bold">
				MERN Ballroom Studio
			</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation"
                onClick={handleNavCollpase}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className={location.pathname==="/login" ? "nav-link active" : "nav-link"}>
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className={location.pathname==="/signup" ? "nav-link active" : "nav-link"}>
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/events" className={location.pathname==="/events" ? "nav-link active" : "nav-link"}>
                       Events
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/social" className={location.pathname==="/social" ? "nav-link active" : "nav-link"}>
                       Social
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/payment" className={location.pathname==="/payment" ? "nav-link active" : "nav-link"}>
                        Payment
                    </Link>
                </li>
                </ul>
            </div>
		</nav>
	);
}

export default Navbar;