import React, {useState, useEffect} from 'react';
import API from '../../utils/API';
import Session from '../Session';


function StudentContent() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(currentDate);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [registeredSessions, setRegisteredSessions] = useState([]);

    useEffect( () => {
        getSessionsByMonth(month);
        getMySessions(month);
    },[month])

    const getSessionsByMonth = (month) => {
        API.getSessionsByMonth(month).then(results => {
            setSessions(results.data);
        }).catch(err => {
            console.log(err);
        });
    };

    const getMySessions = (month) => {
        API.getMySessions(month).then(results => {
            // console.log(results.data[0].userSessions);
            const sessionIdArr = results.data[0].userSessions.map(e => e.session);
            console.log(sessionIdArr);
            setRegisteredSessions(sessionIdArr);
        }).catch(err => {
            console.log(err);
        })
    }

    const monthString = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }

    const getPrevMonth = () => {
        let prevDate = new Date(date.setMonth(date.getMonth()-1));
        setMonth(prevDate.getMonth());
        setYear(prevDate.getFullYear());
        setDate(prevDate);
    };

    const getNextMonth = () => {
        let nextDate = new Date(date.setMonth(date.getMonth()+1));
        setMonth(nextDate.getMonth());
        setYear(nextDate.getFullYear());
        setDate(nextDate);
    }

    return (
        <div>
            {/* {console.log(registeredSessions)} */}
            <h1>Sessions available in {monthString[month]} {year}</h1>
            <button type="button" onClick={getPrevMonth}>Prev Month</button>
            <button type="button" onClick={getNextMonth}>Next Month</button>
            <div className="row justify-content-around">
                {sessions.map(session =>
                    <Session 
                    classname="col col-sm-4"
                    key={session._id} 
                    sessionId={session._id}
                    registered={(registeredSessions.indexOf(session._id)>= 0) ? true : false}
                    sessionName={session.sessionName}
                    sessionType={session.sessionType}
                    level={session.level}
                    inPersonLimit={session.inPersonLimit}
                    teacher={session.teachers}
                    sessionCalendar={session.sessionCalendar}
                    date={date}
                    />)}
            </div>
        </div>
    )
}

export default StudentContent;