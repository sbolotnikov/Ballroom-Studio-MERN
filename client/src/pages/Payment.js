import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Payments(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
Payments PAGE
        </Fragment>
    )
}

export default Payments;