import React, {useState, useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import SessionCard from './SessionCard';

function MySessions() {
    const [sessions, setSessions] = useState([]);
    const {userId} = useContext(UserContext);

    useEffect(() => {
        API.getTeacherSessions(userId).then( results => {
            console.log(results.data);
            setSessions(results.data);
        })
    }, [userId])
    return (
        <div>
            {sessions.map( session => 
                <SessionCard 
                    key={session._id} 
                    id={session._id}
                    name={session.sessionName}
                    type={session.sessionType}
                    dates={session.sessioCalendar}/>
                )
            }
        </div>
    )
};

export default MySessions;