import React, {useContext} from 'react';
import UserContext from '../../utils/UserContext';
import MemberTable from '../MembersTable/MemberTable'
import StudentSchedule from '../StudentSchedule/';
import TeacherContent from '../TeacherContent';

function MemberInfo(props) {
    const {loggedIn} = useContext(UserContext);

    console.log(props);
    let memberStatus = [...props.profile.memberStatus];

    return (
        <div className="container">
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === true ? 'Welcome ' + props.profile.firstName + " " + props.profile.lastName : 'Please log in'}</div>

        {loggedIn ?
           <div className="row">
                <div className="col col-lg-6">
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
                            Ballroom
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Certification: <span className="level">{props.profile.certLevel}</span></li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-danger" id="updateProBtn" data-toggle="modal" data-target="#updateProfileModal">Update Profile</button>
                </div>
            {/* Display member content depending on their memberStatus */}
            {memberStatus.indexOf("student") >= 0 ? <StudentSchedule /> : <div></div>}
            {memberStatus.indexOf("teacher") >= 0 ? <TeacherContent /> : <div></div>}
            {memberStatus.indexOf("admin") >= 0 ? <MemberTable /> : <div></div>}
            </div>

        : <div></div>}

        </div>
    )
};

export default MemberInfo;