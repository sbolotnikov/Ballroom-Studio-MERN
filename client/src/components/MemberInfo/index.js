import React, { useState , useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import MemberTable from '../MembersTable/MemberTable'
import StudentSchedule from '../StudentContent';
import TeacherContent from '../TeacherContent';
import Cloudinary from '../Cloudinary';

const styles = {
    img: {
        maxWidth: "200px",
        objectFit: "cover"
    },
    input: {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    }
}

function MemberInfo(props) {
    const {loggedIn, email, userId} = useContext(UserContext);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState(null);
    const [newEmail, setNewEmail] = useState(email);
    const [imgUrl, setImgUrl] = useState(null);

    const saveProfile = () => {
        // ADD VALIDATION
        API.updateProfile(userId, {
            email: newEmail,
            phoneNumber: newPhoneNumber || props.profile.phoneNumber,
            profilePhotoUrl: imgUrl || props.profile.profilePhotoUrl
        })
            .then((res) => {
                console.log("succesfuly updated user");
                setUpdateProfile(false);
                props.getProfile();
            }).catch( err => {
                console.log(err);
            })
    }

    const toggleUpdate= () => {
        setUpdateProfile(!updateProfile);
    }

    const getImgUrl = (url) => {
        setImgUrl(url);
    }

    return (
        <div className="container">
           <div className="formTop d-flex justify-content-center mt-4">{loggedIn === false ? 'Please log in' : "Welcome " + props.profile.firstName + " " + props.profile.lastName}</div>

        {loggedIn === true ?
           <div className="card mt-4 ">
                     <div className="card-header bg-danger text-light">
                            My Info
                        </div>
                    <div className="row no-gutters">
                        {updateProfile ? 
                            <Cloudinary style={styles.img} getImgUrl={getImgUrl}/> :
                            <img src={props.profile.profilePhotoUrl} style={styles.img} className="card-img-top" alt="user avatar"/>
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Email</label>
                                    <div className="col-8">
                                    {updateProfile ?
                                        <input  name="phoneNumber" type="text" className="form-control-plaintext" placeholder={props.profile.email} 
                                            style={styles.input}
                                            onChange={event => setNewEmail(event.target.value)}/>
                                            :
                                            <div className="form-control-plaintext">{props.profile.email}</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Phone Number</label>
                                    <div className="col-8">
                                        {updateProfile ?
                                        <input  name="phoneNumber" type="text" className="form-control-plaintext" placeholder={props.profile.phoneNumber} 
                                            style={styles.input}
                                            onChange={event => setNewPhoneNumber(event.target.value)}/>
                                            :
                                            <div className="form-control-plaintext">{props.profile.phoneNumber}</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Dance Level</label>
                                    <div className="col-8 form-control-plaintext">
                                    {props.profile.certLevel}
                                    </div>
                                </div>
                            </form>
                            <button type="button" className="btn btn-danger mt-4" id="updateProBtn" onClick={toggleUpdate}>{updateProfile ? "Cancel" : "Update Profile"}</button>
                            {updateProfile &&     
                                <button type="button" className="btn btn-danger mt-4 mx-4" id="saveProBtn" onClick={saveProfile}>Save Profile</button>}
                        </div>
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