import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.css";
import API from '../../utils/API';
import Cloudinary from '../Cloudinary';


//  class SignupForm extends React.Component{
//     constructor(props){
//       super(props);
//       this.setState({certlevel: "social foundation", memberstatus: "student"});
function SignupForm(props) {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [certlevel, setCertLevel] = useState('social foundation');
    const [memberstatus, setMemberStatus] = useState('student');
    const [errorstate, setErrorState] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
   
    // setMemberStatus("student");
    // setCertLevel("social foundation");
    // use history to redirect after login
    const history = useHistory();

    function handleSignup(event) {
        event.preventDefault();

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.toLowerCase())) {
            let memberArr=[]
            memberArr.push(memberstatus);
            const userLogin = {
                firstName: firstname,
                lastName: lastname,
                email: email,
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
                history.push("/member");
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
            {errorstate && (<ErrorNotice message={errorstate} left={10} top={10} clearError={() => setErrorState(undefined)} />)}
            <div className="card-body font-weight-bold bgW">
                <form className="create" onSubmit={handleSignup}>
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
                                onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="phoneNumber">Telephone</label>
                            <input type="text" className="input" id="phoneNumber" placeholder="use this format 111-111-1111"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={event => setPhoneNumber(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="password">Password</label>
                            <input type="password" className="input" id="password" placeholder="**********" onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" className="input" id="confirmPassword" placeholder="**********"></input>
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
                        <Cloudinary getImgUrl={getImgUrl}/>

                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="btn btn-circle btn-lg">Sign Up</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignupForm;