import React, { useState, useContext } from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import MemberTable from '../MembersTable/MemberTable'
import StudentContent from '../StudentContent';
import TeacherContent from '../TeacherContent';
import "./style.css";
import Cloudinary from '../Cloudinary';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import moment from 'moment';

const styles = {
    img: {
        width: "200px",
        objectFit: "cover",
        margin: "10px"
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
    const { loggedIn, email, userId } = useContext(UserContext);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState(null);
    const [newEmail, setNewEmail] = useState(email);
    const [imgUrl, setImgUrl] = useState(null);
    const [birthday, setBirthday] = useState('');

    const saveProfile = () => {
        // ADD VALIDATION
        API.updateProfile(userId, {
            email: newEmail || email,
            phoneNumber: newPhoneNumber || props.profile.phoneNumber,
            profilePhotoUrl: imgUrl || props.profile.profilePhotoUrl,
            birthday: birthday || props.profile.birthday
        })
            .then((res) => {
                console.log("succesfuly updated user");
                setUpdateProfile(false);
                props.getProfile();
            }).catch(err => {
                console.log(err);
            })
    }

    const toggleUpdate = () => {
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
                    <div className="formTop">
                        My Info
                        </div>
                    <div className="row no-gutters justify-content-center">
                        <div>
                            <img src={props.profile.profilePhotoUrl?props.profile.profilePhotoUrl: process.env.PUBLIC_URL + "./imgs/defaultIcon.png"} style={styles.img} className="card-img" alt="user avatar" />
                            {updateProfile ?
                                <Cloudinary style={styles.img} getImgUrl={getImgUrl} /> : <div></div>
                            }
                        </div>

                        <div className="card-body">
                            <form>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Email</label>
                                    <div className="col-8">
                                        {updateProfile ?
                                            <input name="phoneNumber" type="text" className="form-control-plaintext" defaultValue={props.profile.email}
                                                style={styles.input}
                                                onChange={event => setNewEmail(event.target.value)} />
                                            :
                                            <div className="form-control-plaintext">{props.profile.email}</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Phone Number</label>
                                    <div className="col-8">
                                        {updateProfile ?
                                            // <input name="phoneNumber" type="text" className="form-control-plaintext" placeholder={props.profile.phoneNumber}
                                            //     style={styles.input}
                                            //     onChange={event => setNewPhoneNumber(event.target.value)} />
                                            <PhoneInput className="form-control-plaintext" name="phoneNumber"
                                                country={'us'}
                                                value={props.profile.phoneNumber}
                                                onChange={phonenumber => setNewPhoneNumber(phonenumber)}
                                                inputStyle={styles.input}

                                            />
                                            :
                                            <PhoneInput className="input" id="phoneNumber"
                                                country={'us'}
                                                // value={phoneInput}
                                                disabled
                                                value={props.profile.phoneNumber}
                                                inputStyle={{ paddingLeft: '55px', border: '0', boxShadow: '0px white', background: 'white', height: '40px' }}
                                                
                                            />
                                            // <div className="form-control-plaintext">{props.profile.phoneNumber}</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-4 col-form-label">Birth Date</label>
                                    <div className="col-8">
                                        {updateProfile ?
                                            <input type="date" className="form-control-plaintext"  defaultValue={props.profile.birthday ? props.profile.birthday.substring(0, 10):""}
                                                onChange={event => setBirthday(event.target.value)} />
                                            :
                                            <input type="date" className="form-control-plaintext"  defaultValue={props.profile.birthday ? props.profile.birthday.substring(0, 10):""}
                                            onChange={event => setBirthday(event.target.value)} disabled />
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
                            <button type="button" className="cuteBtn mt-4" id="updateProBtn" onClick={toggleUpdate}>{updateProfile ? "Cancel" : "Update Profile"}</button>
                            {updateProfile &&
                                <button type="button" className="cuteBtn mt-4 mx-4" id="saveProBtn" onClick={saveProfile}>Save Profile</button>}

                        </div>
                    </div>
                </div>

                : <div></div>}

            <div className="row mt-4">
                {(props.profile.memberStatus && loggedIn) ?
                    <div className="col">
                        {props.profile.memberStatus.indexOf("student") >= 0 ? <StudentContent profile={props.profile} /> : <div></div>}
                        {props.profile.memberStatus.indexOf("teacher") >= 0 ? <TeacherContent profile={props.profile} /> : <div></div>}
                        {props.profile.memberStatus.indexOf("admin") >= 0 ? <MemberTable profile={props.profile} /> : <div></div>}
                    </div>
                    : <div></div>}
            </div>
        </div>
    )
};

export default MemberInfo;