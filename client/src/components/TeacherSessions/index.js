import React, {useState, useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import SessionCard from './SessionCard';
import Accordion from 'react-bootstrap/Accordion';

function MySessions() {
    const [sessions, setSessions] = useState([]);
    const {userId} = useContext(UserContext);

    useEffect(() => {
        API.getTeacherSessions(userId).then( results => {
            setSessions(results.data);
        })
    }, [userId])
    return (
        <div>
            <Accordion>
                {sessions.map( session => 
                    <SessionCard 
                        key={session._id} 
                        id={session._id}
                        name={session.sessionName}
                        type={session.sessionType}
                        dates={session.sessionCalendar}/>
                    )
                }
            </Accordion>
        </div>
    )
};

export default MySessions;