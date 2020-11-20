import React, { Fragment, useEffect } from 'react';
import MemberNav from '../components/MemberNav';
import Calendar from '../components/Calendar/calendar.js';
// eslint-disable-next-line

function Events() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <MemberNav />
            <Calendar></Calendar>
        </Fragment>
    )
}

export default Events;