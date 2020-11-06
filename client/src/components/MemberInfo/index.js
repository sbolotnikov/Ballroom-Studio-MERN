import React, { useState , useEffect, useContext} from 'react';
// import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import MemberTable from '../MembersTable/MemberTable'
import StudentSchedule from '../StudentSchedule/';
import TeacherContent from '../TeacherContent';


function MemberInfo(props) {
    // const [profile, setProfile] = useState({});
    const {loggedIn} = useContext(UserContext);

    // console.log(loggedIn);

    
    // useEffect( () => {
    //         API.getProfile().then( results => {
    //             console.log()
    //             setProfile(results.data);
    //         }).catch (err => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div className="container">
            {console.log(props.profile)}
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === false ? 'Please log in' : "Welcome " + props.profile.firstName + " " + props.profile.lastName}</div>

        {loggedIn === true ?
           <div className="row">
                <div className="col">
                    <div className="card mt-4">
                        <div className="card-header bg-danger text-light">
                            My Contact Info
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Email: <span className="member-email">{props.profile.email}</span></li>
                            <li className="list-group-item">Phone Number: <span className="member-phone">{props.profile.phoneNumber}</span></li>
                        </ul>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header bg-danger text-light">
                            Certification Level
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Level: <span className="level">{props.profile.certLevel}</span></li>
                        </ul>
                    </div>


                    <button type="button" className="btn btn-danger mt-4" id="updateProBtn" data-toggle="modal" data-target="#updateProfileModal">Update Profile</button>
                </div>
            </div>
            
        : <div></div>}
        <div className="row mt-4">
                    {(props.profile.memberStatus && loggedIn) ?
                    <div className="col">
                    {props.profile.memberStatus.indexOf("student") >= 0 ? <StudentSchedule profile={props.profile}/> : <div></div>}
                    {props.profile.memberStatus.indexOf("teacher") >= 0 ? <TeacherContent profile={props.profile}/> : <div></div>}
                    {props.profile.memberStatus.indexOf("admin") >= 0 ? <MemberTable profile={props.profile}/> : <div></div>}
                    </div>
                    : <div></div>}
                </div>
        </div>
    )
};

export default MemberInfo;