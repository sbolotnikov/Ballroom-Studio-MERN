import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CreateSession from '../CreateSession';
import MySessions from '../TeacherSessions';
import './teacher.css';

function TeacherContent() {
    const [tabToggle, setTabToggle] = useState(1);

    const handleTabToggle = (event) => {
        setTabToggle(event.target.parentElement.value);
    }

    return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item" value="1" onClick={handleTabToggle}>
                        <Link className={tabToggle === 1 ? "nav-link active" : "nav-link"} to="#">My Sessions</Link>
                    </li>
                    <li className="nav-item" value="2" onClick={handleTabToggle}>
                        <Link className={tabToggle === 2 ? "nav-link active" : "nav-link"} to="#">Create Session</Link>
                    </li>
                </ul>
                {tabToggle === 1 ? <MySessions/> :<CreateSession/> }
            </div>
    )
}

export default TeacherContent;