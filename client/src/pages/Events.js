import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Events(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
Events PAGE
        </Fragment>
    )
}

export default Events;