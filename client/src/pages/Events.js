import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar/navbar.js';
import Calendar from '../components/Calendar/calendar.js';
// eslint-disable-next-line
import { Link } from 'react-router-dom';

function Events() {
    useEffect(() => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
            <Navbar></Navbar>
            <Calendar></Calendar>
        </Fragment>
    )
}

export default Events;