// Recover Password page
import React, { Fragment, useState } from 'react';
import MemberNav from '../../components/MemberNav';
import ErrorNotice from "../../components/misc/errorNotice";
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';

function ChangePassword() {
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [errorstate, setErrorState] = useState(false);
    const history = useHistory();
    function handleRecovery(event) {
        event.preventDefault();

        if ((password.length >3) && (password === password1)) {


            API.getProfile().then(results => {

                const userInfo = {
                    userId: results.data._id,
                    password: password
                };
                // after login is successful, use history.push to redirect
                API.ChangePassword(userInfo).then((res1) => {
                    history.push("/member");
                })
                    .catch(err => {
                        console.log(err)
                        setErrorState('Unable to Change Password');

                    });
            })
                .catch(err => {
                    console.log(err)
                    setErrorState('Unable get profile information');

                });

        } else {
            setErrorState("Password need to be  more then 3 symbols and match confirmation input");
        }



    };

    return (
        <Fragment>
            <MemberNav />
            <h3>Enter your New password</h3>
            {errorstate && (<ErrorNotice message={errorstate} clearError={() => setErrorState(undefined)} />)}
            <form className="create" id="formRecovery">
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
                <div className="d-flex justify-content-around">
                    <button className="btn btn-circle btn-lg" onClick={handleRecovery} >Continue</button>
                </div>
            </form>
        </Fragment>
    )
}

export default ChangePassword;