import React, { useState , useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';


function MemberInfo() {
    const [profile, setProfile] = useState({});
    const {loggedIn} = useContext(UserContext);

    console.log(loggedIn);

    
    useEffect( () => {
            API.getProfile().then( results => {
                console.log()
                setProfile(results.data);
            }).catch (err => {
                console.log(err);
            })
    }, [])


    return (
        <div className="container">
            {console.log(profile)}
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === false ? 'Please log in' : profile.firstName + " " + profile.lastName}</div>

        {loggedIn === true ?
           <div className="row">
                <div className="col col-lg-5">
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
                            My School Record
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Rank: <span className="level">{profile.certlevel}</span></li>
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