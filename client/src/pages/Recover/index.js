// Recover Password page
import React, { Fragment, useState } from 'react';
import MemberNav from '../../components/MemberNav';
import ErrorNotice from "../../components/misc/errorNotice";
import API from '../../utils/API';

function RecoverDisplay() {
    const [email, setEmail] = useState('');
    const [errorstate, setErrorState] = useState(false);

    function handleRecovery(event) {
        event.preventDefault();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email.toLowerCase())) {

            // after login is successful, use history.push to redirect
            
                // after login is successful, use history.push to redirect
                API.recoverPassword({ email: email }).then(results => {
                    setErrorState('Success! Email sent. Check your Email and re-login');
                    
                    // history.push("/member");
                })
                .catch(err => {
                    console.log(err.response.data)
                    setErrorState(err.response.data.error);

                });
        } else {
            setErrorState("bad email input");
        }
    };

    return (
        <Fragment>
            <MemberNav />
            <h3>Enter the Email to Recover your password</h3>
            {errorstate && (<ErrorNotice message={errorstate} clearError={() => setErrorState(undefined)} />)}
            <form className="create" id="formRecovery">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="email">Email</label>
                        <input type="text" className="input" id="email" placeholder="Dancer@Ballroom.com"
                            onChange={event => setEmail(event.target.value)} />
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-circle btn-lg" onClick={handleRecovery} >Send Email</button>
                </div>
            </form>
        </Fragment>
    )
}

export default RecoverDisplay;