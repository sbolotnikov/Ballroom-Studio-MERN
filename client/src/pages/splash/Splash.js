import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Splash(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
SPLASH PAGE
        </Fragment>
    )
}

export default Splash;