import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Login(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
LOGIN PAGE
        </Fragment>
    )
}

export default Login;