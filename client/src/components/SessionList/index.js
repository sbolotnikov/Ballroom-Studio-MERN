import React from 'react';

function Session(props) {
    return(
     
        <li className="list-group-item">
            <div>{props.sessionName}</div>
            <div>{props.level}</div>
            <div>{props.inPersonLimit}</div>
            <div>{props.teachers}</div>
            <div>{props.sessionCalendar}</div>
        </li>

    )
}

export default Session;