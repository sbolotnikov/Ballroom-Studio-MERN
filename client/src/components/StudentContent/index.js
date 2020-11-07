import React, {useState} from 'react';
import API from '../../utils/API';


function StudentContent() {
    const [sessions, setSessions] = useState([]);

    const getSessionsByType = () => {
        API.getSessionsByType().then(results => {
            setSessions(results);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            Search for sessions
            <ul>
            </ul>
        </div>
    )
}

export default StudentContent;