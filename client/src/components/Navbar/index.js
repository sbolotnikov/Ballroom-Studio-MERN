import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import "./style.css";

function Navigation(props) {
    const [show, setShow] = useState(true);
    return (
        <header>
            <Nav className="bg-danger text-light p-1">
                <p className="h4 mb-0">Call 1-888-123-4567 to learn about our COVID-19 Safety Guidelines</p>
            </Nav>
            <Nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <Link to="/" className="navbar-brand">
                    <img
                        src={process.env.PUBLIC_URL + "./imgs/martial-arts-square.png"}
                        width="100" height="100" className="d-inline-block align-middle"
                        alt="studio logo" loading="lazy"
                    />
                    <h1 className="d-inline align-middle">BEST TIME TO DANCE</h1>
                </Link>


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav nav-pills ml-auto">

                        <li className="nav-item mr-3">
                            <Link to="/" className="nav-link active bg-danger">Home</Link>
                        </li>
                        <li className="nav-item mr-3">
                            <Link to="aboutUs.html" className="nav-link text-light">About Studio</Link>
                        </li>
                        <li className="nav-item mr-3">
                            <Link to="class_schedule.html" className="nav-link text-light">Classes</Link>
                        </li>
                        <li className="nav-item mr-3">
                            <Link to="contact.html" className="nav-link text-light" >Contact Us</Link>
                        </li>
                        <li className="nav-item mr-3 d-lg-none">
                            <Link to="login.html" className="nav-link text-light">Login</Link>
                        </li>
                        <li className="nav-item mr-3 d-lg-none">
                            <Link to="signup.html" className="nav-link text-light" >Register</Link>
                        </li>
                        <li className="nav-item mr-3 d-none d-lg-block">
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
                        </li>
                    </ul>
                </div>
    </Nav>
    </header>
    )
}

export default Navigation;