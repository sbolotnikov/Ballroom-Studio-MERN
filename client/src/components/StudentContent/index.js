import React, {useState, useEffect} from 'react';
import API from '../../utils/API';
import Session from '../SessionList';


function StudentContent() {
    const [sessions, setSessions] = useState([]);
    const [sessionType, setSessionType] = useState("group");

    useEffect( () => {
        getSessionsByType()
    },[])

    const getSessionsByType = () => {
        API.getSessionsByType("group").then(results => {
            setSessions(results.data);
        }).catch(err => {
            console.log(err);
        });
    };

    const getSessionsByAdult = () => {
        API.getSessionsByAdult(true).then(results => {
            setSessions(results.data);
        }).catch(err => {
            console.log(err);
        });
    };

    const getSessionsByMonth = () => {
        API.getSessionsByMonth(11).then(results => {
            setSessions(results.data);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            Search for sessions
            <ul>
                {sessions.map(session =>
                    <Session 
                    key={session._id} 
                    sessionName={session.sessionName}
                    level={session.level}
                    inPersonLiit={session.inPersonLimit}
                    teachers={session.teachers}
                    sessionCalendar={session.sessionCalendar}
                    />)}
            </ul>
        </div>
    )
}

export default StudentContent;