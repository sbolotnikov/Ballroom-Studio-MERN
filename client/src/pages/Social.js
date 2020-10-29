import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Social(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
Social PAGE
        </Fragment>
    )
}

export default Social;