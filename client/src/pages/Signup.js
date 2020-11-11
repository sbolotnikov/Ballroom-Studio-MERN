import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar/navbar' 
import SignupForm from '../components/SignupForm'
import SignupHeader from '../components/Signup Header'

function Signup() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar />
            <SignupHeader />
            <SignupForm />
        </Fragment>
    )
}

export default Signup;