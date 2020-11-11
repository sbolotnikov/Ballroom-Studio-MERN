import React, {Fragment, useEffect} from 'react';

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