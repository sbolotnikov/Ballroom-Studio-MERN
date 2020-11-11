import React, {Fragment, useEffect} from 'react';

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