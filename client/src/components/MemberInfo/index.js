import React, { useState , useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';


function MemberInfo() {
    const [profile, setProfile] = useState({});
    const {loggedIn} = useContext(UserContext);
    
    useEffect( () => {
            API.getProfile().then( results => {
                setProfile(results.data);
            }).catch (err => {
                console.log(err);
            })

            // cleanup after component unmounts and set Profile to an empty object
            return setProfile({});
    }, [])


    return (
        <div className="container">
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === true ? 'Welcome ' + profile.firstName + " " + profile.lastName : 'Please log in'}</div>

        {loggedIn === true ?
           <div className="row">
                <div className="col col-lg-6">
                    <div className="card mt-4">
                        <div className="card-header bg-danger text-light">
                            My Contact Info
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Email: <span className="member-email">{profile.email}</span></li>
                            <li className="list-group-item">Phone Number: <span className="member-phone">{profile.phoneNumber}</span></li>
                        </ul>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header bg-danger text-light">
                            Ballroom
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Certification: <span className="level">{profile.certLevel}</span></li>
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