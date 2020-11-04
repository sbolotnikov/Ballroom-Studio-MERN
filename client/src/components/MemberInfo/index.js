import React, {useContext} from 'react';
import UserContext from '../../utils/UserContext';


function MemberInfo(props) {
    const {loggedIn} = useContext(UserContext);


    return (
        <div className="container">
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === true ? 'Welcome ' + props.profile.firstName + " " + props.profile.lastName : 'Please log in'}</div>

        {loggedIn === true ?
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
            </div>
        : <div></div>}
        </div>
    )
};

export default MemberInfo;