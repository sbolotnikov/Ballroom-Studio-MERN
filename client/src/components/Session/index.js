import React, {useState, useEffect, useContext} from 'react';
import API from '../../utils/API';
import moment from 'moment';
import UserContext from '../../utils/UserContext';

const styles = {
    card: {
        maxWidth: "300px"
    }
}

function Session(props) {
    const [name, setName] = useState("");
    // const [sessionDates, setSessionDates] = useState([]);
    const [registered, setRegistered] = useState(false);
    const {userId} = useContext(UserContext);

    useEffect(() => {
        getTeacherName(props.teacher[0]);
        // getSessionDatesForMonth(props.date, props.date.getMonth());
        if(props.registered) {
            setRegistered(true);
        }
    }, [props.registered, props.teacher]);
    
    const getTeacherName = (id) => {
        API.getUserProfile(id).then( results => {
            setName(results.data[0].firstName +" " + results.data[0].lastName);
        })
    };

    // const getSessionDatesForMonth = (date, month) => {
    //     let firstDayOfMonth = new Date(date.getFullYear(), month, 1);
    //     let lastDayOfMonth = new Date(date.getFullYear(), month+1, 0);
    //     let sessionDatesForMonth = props.sessionCalendar.filter(d => {
    //         let day = new Date(d);
    //         return (day.getTime() >= firstDayOfMonth.getTime() 
    //             && day.getTime() <= lastDayOfMonth.getTime());
    //     });
    //     // console.log(sessionDatesForMonth);
    //     setSessionDates(sessionDatesForMonth);
    // }

    const registerForSession = () => {
        const session = props.sessionCalendar.map(date => {
            return {
                sessionId: props.sessionId,
                length: 1,
                sessionDate: date
            }
        });
        API.registerForSession(userId, session).then( results => {
            console.log("registered for session");
            setRegistered(true);
        }).catch( err => {
            console.log(err);
        })
    }

    return(
        <div className="card mb-3" style={styles.card}>
            <div className="h1 card-header">{props.sessionName}</div>
            <div className="card-body">
                <h5 className="card-title">{props.sessionType? props.sessionType.toUpperCase() : ""}</h5>
                <h4 className="card-subtitle">Instructor: {name}</h4>
                <p className="card-text">This class is suited for dancers of <span className="badge badge-warning">{props.level}</span> level</p>
                <li className="list-group-item list-group-item-success">
                    <div>{props.inPersonLimit} people limit per session</div>
                    {props.sessionCalendar.map(date => <div key={date}>
                        {moment(date).format("ddd MM/DD/YYYY HH:MMa")}
                    </div>)}
                </li>
                {registered ? <div className="btn-success">You are registered</div>:
                <button type="button" className="cuteBtn" onClick={registerForSession}>Register for Session</button>
                }   
            </div>
        </div>
        

    )
}

export default Session;