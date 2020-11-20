import React, {useEffect, useState, useContext} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';
import UserContext from '../utils/UserContext';

function MemberPage(){  
    const [profile, setProfile] = useState({});
    const {setLoggedIn, setEmail, setUserId} = useContext(UserContext);

    useEffect(() => {
        const getProfile = () => {
            API.getProfile().then(results => {
                setProfile(results.data);
                setUserId(results.data.id);
                setLoggedIn(true);
                setEmail(results.data.email);
            }).catch(err => {
                console.log(err);
            })
        }
        getProfile();

        return; 
    },[]);

    const getUpdatedProfile = () => {
            API.getProfile().then(results => {
                setProfile(results.data);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <MemberNav />
            <MemberInfo profile={profile} getProfile={getUpdatedProfile}/>
        </div>
    )
}

export default MemberPage;