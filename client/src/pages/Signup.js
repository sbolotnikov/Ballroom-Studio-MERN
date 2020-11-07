import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar' 
import SignupForm from '../components/SignupForm'
import About from '../components/About'

function Signup() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar></Navbar>
            <About></About>
            <SignupForm></SignupForm>
        </Fragment>
    )
}

export default Signup;