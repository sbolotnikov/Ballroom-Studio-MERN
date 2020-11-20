import React, { Fragment, useEffect } from 'react';
import MemberNav from '../components/MemberNav';
import SignupForm from '../components/SignupForm'
import SignupHeader from '../components/Signup Header'

function Signup() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <MemberNav imgLink={""} memberStatus={""}/>
            <SignupHeader />
            <SignupForm />
        </Fragment>
    )
}

export default Signup;