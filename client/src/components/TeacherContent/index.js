import React, {useState, useContext} from 'react';
import API from '../../utils/API'
import UserContext from '../../utils/UserContext';
import TimePicker from 'react-time-picker';
import './teacher.css';

function TeacherContent() {
    const {userId} = useContext(UserContext);
    const [repeatSession, setRepeatSession] = useState(false);
    const [session, setSession] = useState({
        sessionName: "",
        adultClass: false,
        level: "social foundation",
        sessionType: "group",
        inPersonLimit: 0,
        startDate:"",
        endDate:"",
        daysOfWeek:[],
        teachers:[userId]
    });
    const [time, setTime] = useState('10:00');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(!repeatSession) {
            setSession({
                ...session,
                endDate: ""
            })
        }
        API.createSession({...session, startTime: time}).then( res => {
            console.log("successfully created a new session");
        }).catch(err => {
            console.log(err);
        })
    }

    const handleInput = event => {
        const value = event.target.value;
        const name = event.target.name;
    
        setSession({
            ...session,
            [name]: value
        });
    }

    const handleMultipleSelect = event => {
        console.log(event.target.options);
        let days = []
        for (let i=0; i<event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                days.push(parseInt(event.target.options[i].value));
            }
        }
        setSession({
            ...session,
            daysOfWeek: days
        })
    }

    return (
            <div className="modal-body text-dark">
                <form className="add-session" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="class-name-input">Enter New Session Name</label>
                        <input type="text" className="form-control" name="sessionName" required onChange={handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adult-class">Junior or Adult Class?</label>
                        <select className="form-control" name="adultClass" onChange={handleInput}>
                            <option value="0">Junior</option>
                            <option value="1">Adult</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="experience-level">Enter Dance Level"</label>
                        <select className="form-control" name="level" onChange={handleInput}>
                            <option value="social foundation">1. Social Foundation</option>
                            <option value="gold">2. Gold</option>
                            <option value="silver">3. Silver</option>
                            <option value="bronze">4. Bronze</option>
                            <option value="open">5. Any</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="experience-level">Enter Session Type"</label>
                        <select className="form-control" name="sessionType" onChange={handleInput}>
                            <option value="group">1. Group</option>
                            <option value="private">2. Private</option>
                            <option value="party">3. Party</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="in-person-limit">Enter In Person Limit</label>
                        <input type="number" className="form-control" name="inPersonLimit" onChange={handleInput}/>
                    </div>
                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" value="repeat"
                            onClick={event => setRepeatSession(!repeatSession)}/>
                        <label className="form-check-label" htmlFor="repeat-class">
                            Is this a repeat session?
                        </label>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="startDate">Enter {repeatSession && "Start"} Date</label>
                            <input type="date" className="form-control" name="startDate" onChange={handleInput} required/>
                        </div>
                        <div className="col-6">
                        <TimePicker onChange={setTime} value={time} clearIcon={null} clockIcon={null}/>
                        </div>
                    </div>
                        {repeatSession &&
                        <div>
                        <div className="row form-group col-6">
                            <label htmlFor="endDate">Enter End Date</label>
                            <input type="date" className="form-control" name="endDate" onChange={handleInput}/>
                        </div>
                        
                        <div className="form-group col">
                            <label htmlFor="daysOfWeek">Select Which Days of Week</label>
                            <select multiple={true} className="form-control" name="daysOfWeek" onChange={handleMultipleSelect}>
                            <option value="0">Sunday</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            </select>
                        </div>
                        </div>}
                    <button type="submit" className="btn btn-danger" id="addSessionBtn">Create New Session</button>
                </form>
            </div>
    )
}

export default TeacherContent;