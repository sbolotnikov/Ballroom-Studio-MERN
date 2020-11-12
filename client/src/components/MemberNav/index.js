/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import UserContext from '../../utils/UserContext'

function MemberNav(props) {
    const { setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    const [isNavCollapsed, setIsNavCollpased] = useState(true);

    // use history to redirect after login
    const history = useHistory();

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
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
                        <Link to="/about" className="nav-link">
                           About
                    </Link>
                    </li>
                    {loggedIn && props.memberStatus && (props.memberStatus.indexOf("admin")>=0) &&
                    <li className="nav-item">
                        <Link to="/invoices" className="nav-link">
                            Invoices
                    </Link>
                    </li>
                    }   
                    {loggedIn && 
                    <li className="nav-item">
                        <Link to="" className="nav-link" onClick={event => {


                            API.logout().then((results) => {
                                setLoggedIn(false);
                                setEmail("");
                                history.push("/home");
                            })
                                .catch(err => {
                                    console.log(err)

                                });
                        }} >
                            Logout
                    </Link>
                    </li> }
                </ul>
            </div>
            {loggedIn && 
            <Link to="/member" className="nav-link">
            <img src={props.imgLink} alt="member photo" className="member-photo" />
            </Link>}
        </nav>
    );
}

export default MemberNav;