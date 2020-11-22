import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.css";
import API from '../../utils/API';
import Cloudinary from '../Cloudinary';
import ErrorNotice from '../misc/errorNotice';
import UserContext from '../../utils/UserContext';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function SignupForm(props) {
    const { setLoggedIn, setEmail, setUserId } = useContext(UserContext);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email1, setEmail1] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [birthday, setBirthday] = useState('');
    const [certlevel, setCertLevel] = useState('social foundation');
    const [memberstatus, setMemberStatus] = useState('student');
    const [errorstate, setErrorState] = useState(false);
    const [imgUrl, setImgUrl] = useState("");


    const history = useHistory();
    var phoneInput = ""
    function handleSignup(event) {
        event.preventDefault();
        if (password !== password1) {
            setErrorState("Confirmed Password does not match original");
            return
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email1.toLowerCase())) {
            let memberArr = []
            memberArr.push(memberstatus);
            const userLogin = {
                firstName: firstname,
                lastName: lastname,
                email: email1,
                phoneNumber: phonenumber,
                password: password,
                birthday: birthday,
                certLevel: certlevel,
                memberStatus: memberArr,
                profilePhotoUrl: imgUrl
            };
            // after login is successful, use history.push to redirect
            API.signup(userLogin).then(() => {
                setErrorState(false);
                const userLogin = {
                    email: email1,
                    password: password
                };
                // after login is successful, use history.push to redirect
                API.login(userLogin).then((results) => {
                    setUserId(results.data.id);
                    setErrorState(false);
                    setLoggedIn(true);
                    setEmail(results.data.email);
                    history.push("/member");
                })
                    .catch(err => {
                        console.log(err.response.data)
                        setErrorState(`<p>Status${err.response.status}</p> <br /><h3>${err.response.data} <br /> Your email already exists in our database</h3>`);

                    });

            })
                .catch(err => {
                    console.log(err.response.data)
                    setErrorState(`<p>Status${err.response.status}</p> <br /><h3>${err.response.data} <br /> Your email already exists in our database</h3>`);

                });
        } else {
            setErrorState("bad email input");
        }
    };

    function getImgUrl(url) {
        setImgUrl(url);
    }



    return (
        <div className="container bgW">
            <div className="formTop d-flex justify-content-center">Sign Up</div>
            <div className="card-body font-weight-bold bgW">
                <form className="create" id="formSignIn" onSubmit={handleSignup}>
                    {errorstate && (<ErrorNotice message={errorstate} left={10} top={10} clearError={() => setErrorState(undefined)} />)}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="firstName">First Name</label>
                            <input type="text" className="input" id="firstname"
                                onChange={event => setFirstName(event.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input type="text" className="input" id="lastname"
                                onChange={event => setLastName(event.target.value)} />
                        </div>
                    </div>
                    <div className="hide" id="photo"></div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="email">Email</label>
                            <input type="email" className="input" id="email" placeholder="Dancer@Ballroom.com"
                                onChange={event => setEmail1(event.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="phoneNumber">Telephone</label>
                            {/* <input type="text" className="input" id="phoneNumber" placeholder="use this format 111-111-1111"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={event => setPhoneNumber(event.target.value)} /> */}

                            <PhoneInput className="input" id="phoneNumber"
                                country={'us'}
                                value={phoneInput}
                                onChange={phonenumber => setPhoneNumber(phonenumber)}
                                inputStyle={{
                                    width: '100%', resize: 'vertical', paddingLeft: '55px', border: '2px solid black',
                                    borderRadius: '25px', boxShadow: '4px 4px 10px rgba(0,0,0,0.06)', height: '40px'
                                }}
                                buttonStyle={{ borderRadius: '25px 0px 0px 25px', border: '2px solid black', boxShadow: '4px 4px 10px rgba(0,0,0,0.06)', height: '40px' }}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="password">Password</label>
                            <input type="password" className="input" id="password" placeholder="**********" onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" className="input" id="confirmPassword" placeholder="**********" onChange={event => setPassword1(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="birthday">Birth Date</label>
                            <input type="date" className="input" id="birthDate"
                                onChange={event => setBirthday(event.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="certLevel">Your level</label>
                            <select id="certLevel" className="" onChange={event => setCertLevel(event.target.value)} >
                                <option value="social foundation">Complete beginner</option>
                                <option value="bronze">Social dancer,not compete or 1 or 2 comps</option>
                                <option value="silver">Intermediate competitor</option>
                                <option value="gold">Competed in Gold</option>
                                <option value="open">Open level competitor</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="memberStatus">Certification</label>
                            <select id="memberStatus" className=""
                                onChange={event => setMemberStatus(event.target.value)}>
                                <option value="student">Student</option>
                                <option value="guest">Guest</option>
                            </select>
                        </div>
                    </div>

                </form>
                <Cloudinary getImgUrl={getImgUrl} />
                <div className="d-flex justify-content-around">
                    <button type="submit" form="formSignIn" className="btn btn-circle btn-lg">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;