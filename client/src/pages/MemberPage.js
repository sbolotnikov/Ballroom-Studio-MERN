import React, {useEffect, useState, useContext} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';
import UserContext from '../utils/UserContext';
import ErrorNotice from "../components/misc/errorNotice";

function MemberPage(){  
    const [profile, setProfile] = useState({});
    const {setLoggedIn, setEmail, setUserId} = useContext(UserContext);
    const [errorstate, setErrorState] = useState(false);

    useEffect(() => {
        const getProfile = () => {
            API.getProfile().then(results => {
                setProfile(results.data);
                setUserId(results.data.id);
                setLoggedIn(!results.data.tempPassword);
                if (results.data.tempPassword) setErrorState("Please reset your password first")
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
            {errorstate && (<ErrorNotice message={errorstate} clearError={() => setErrorState(undefined)} />)}
            <MemberInfo profile={profile} getProfile={getUpdatedProfile}/>
        </div>
    )
}

export default MemberPage;