import React, {Fragment, useEffect} from 'react';
import Navbar from '../components/Navbar/navbar';

function Splash(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar/>
        </Fragment>
    )
}

export default Splash;