/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import API from '../../utils/API';
import "./navbar.css";
import UserContext from '../../utils/UserContext'
import ErrorNotice from "../misc/errorNotice";

function MemberNav(props) {
    const [isNavCollapsed, setIsNavCollpased] = useState(true);
    const { setEmail, loggedIn, setLoggedIn, setUserId } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [errorstate, setErrorState] = useState(false);
    const [imgDisplay, setImgDisplay] = useState('');
    const [memberStatus, setMemberStatus] = useState([]);
    // use history to redirect after login
    const history = useHistory();

    function handleNavCollpase() {
        setIsNavCollpased(!isNavCollapsed)
    }

    function handleShowDropdown() {
        setShowDropdown(!showDropdown)
    }

    useEffect(() => {
        let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
        let status = null;
        API.getProfile().then(results => {
            if (results.data.profilePhotoUrl) {
                imgLink = results.data.profilePhotoUrl;
                status = results.data.memberStatus;
            }
            setImgDisplay(imgLink);
            setMemberStatus(status);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    function handleLogin(event) {
        event.preventDefault();

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(emailId.toLowerCase())) {
            const userLogin = {
                email: emailId,
                password: password
            };
            // after login is successful, use history.push to redirect
            API.login(userLogin).then((results) => {
                setUserId(results.data.id);
                setErrorState(false);
                setLoggedIn(true);
                setEmail(results.data.email);
                console.log(results);
                results.data.tempPassword? history.push("/passChange") : history.push("/member");
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

                                {errorstate && (<ErrorNotice message={errorstate} left={10} top={10} clearError={() => setErrorState(undefined)} />)}
                                <div>
                                    <a href="/auth/google">
                                        <img src={process.env.PUBLIC_URL + "./imgs/google-sign-in-btn.png"} alt="Login with Google" />
                                    </a>
                                </div>
                                <div>
                                   
                                        <h5>Forgot password? Click  <a href="/#/password"> Here </a></h5>
                                   
                                </div>
                                {/* <div className="form-group">
                                    <a href="/auth/facebook">
                                        <h4><span className="fab"><i className="fa fa-facebook-official" aria-hidden="true"></i></span>Login with Facebook</h4>
                                    </a>
                                </div> */}
                            </form>
                        </div>
                    </li>}
                    {!loggedIn && <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Signup
                    </Link>

                    </li>}

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
                    {loggedIn && memberStatus && (memberStatus.indexOf("admin") >= 0) &&
                        <li className="nav-item">
                            <Link to="/invoices" className="nav-link">
                                Invoices
                    </Link>
                        </li>
                    }
                    {loggedIn &&
                        <li className="nav-item">
                            <Link to="" className="nav-link" onClick={event => {

                                setLoggedIn(false);
                                setEmail("");
                                API.logout().then((results) => {

                                    history.push("/");
                                })
                                    .catch(err => {
                                        console.log(err)

                                    });
                            }} >
                                Logout
                    </Link>
                        </li>}
                </ul>
            </div>
            {loggedIn &&
                <Link to="/member" className="nav-link">
                    <img src={imgDisplay} alt="member photo" className="member-photo" />
                </Link>}
        </nav>
    );
}

export default MemberNav;