import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

function SignupForm(props) {

    return (
        <div className="container bgW">
            <div className="formTop d-flex justify-content-center mt-4">Sign Up</div>
            <div className="card-body font-weight-bold bgW">
                <form className="create">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="firstName">First Name</label>
                            <input type="text" className="" id="firstname"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="lastName">Last Name</label>
                            <input type="text" className="" id="lastname"></input>
                        </div>
                    </div>
                    <div className="hide" id="photo"></div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="email">Email</label>
                            <input type="email" className="" id="email" placeholder="Dancer@Ballroom.com"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="phoneNumber">Telephone</label>
                            <input type="text" className="" id="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="password">Password</label>
                            <input type="password" className="" id="password" placeholder="**********"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" className="" id="confirmPassword" placeholder="**********"></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="birthday">Birth Date</label>
                            <input type="text" className="" id="birthDate"></input>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="certLevel">Certification</label>
                            <select id="certLevel" className="">
                                <option>Social Foundation</option>
                                <option>Bronze</option>
                                <option>Silver</option>
                                <option>Gold</option>
                                <option>Open</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="memberStatus">Certification</label>
                            <select id="memberStatus" className="">
                                <option>Student</option>
                                <option>Guest</option>
                            </select>
                        </div>
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