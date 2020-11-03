import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import UserContext from '../../utils/UserContext'

function MemberNav() {
    const { email, setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    console.log("login status " + loggedIn);
    console.log("email  " + email);
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const [imgDisplay, setImgDisplay] = useState('');

    // use history to redirect after login
    const history = useHistory();

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }
    useEffect(() => {
        let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
        API.getProfile().then(results => {
            if (results.data.profilePhotoUrl) {
                imgLink = process.env.PUBLIC_URL + results.data.profilePhotoUrl;
            }
            setImgDisplay(imgLink);
        }).catch(err => {
            console.log(err);
        })


    }, []);

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
                        <Link to="/social" className="nav-link">
                            Social
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/payment" className="nav-link">
                            Payment
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" onClick={event => {


                            API.logout().then((results) => {
                                setLoggedIn(false);
                                setEmail("");
                                // console.log("login status after logout " + loggedIn);
                                // console.log("email  " + email);
                                console.log(results);
                                history.push("/home");
                            })
                                .catch(err => {
                                    console.log(err)

                                });
                        }} >
                            Logout
                    </Link>
                    </li>
                </ul>
                <img src={imgDisplay} alt="member photo" className="member-photo" />
            </div>
        </nav>
    );
}

export default MemberNav;