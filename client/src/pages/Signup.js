import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar' 
import SignupForm from '../components/SignupForm'

function Signup() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar></Navbar>
            <SignupForm></SignupForm>
        </Fragment>
    )
}

export default Signup;