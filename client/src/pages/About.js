import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar' 
import Invoice from '../components/Invoice'
import About from '../components/About'

function Signup() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar></Navbar>
            <About></About>
        </Fragment>
    )
}

export default Signup;