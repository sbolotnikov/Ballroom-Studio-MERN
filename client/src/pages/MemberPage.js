import React, { useState, useEffect, useContext }from 'react';
import MemberInfo from '../components/MemberInfo';
import Navbar from '../components/Navbar/navbar';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';

function MemberPage(){
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
        <div>
            <Navbar profile={profile}/>
            <MemberInfo profile={profile}/>
        </div>
    )
}

export default MemberPage;