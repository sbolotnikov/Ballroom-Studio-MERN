import React, {useEffect, useState, useContext} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';
import UserContext from '../utils/UserContext';

function MemberPage(){
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});
    const [memberStatus, setMemberStatus] = useState([]);
    const {setLoggedIn, setEmail, setUserId} = useContext(UserContext);

    useEffect(() => {
        const getProfile = () => {
            let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
            let status = null;
            API.getProfile().then(results => {
                if (results.data.profilePhotoUrl) {
                    imgLink = results.data.profilePhotoUrl;
                    status=results.data.memberStatus;
                }
                setImgDisplay(imgLink);
                setProfile(results.data);
                setMemberStatus(status);
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
        let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
            API.getProfile().then(results => {
                if (results.data.profilePhotoUrl) {
                    imgLink = results.data.profilePhotoUrl;
                }
                setImgDisplay(imgLink);
                setProfile(results.data);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <MemberNav imgLink={imgDisplay} memberStatus={memberStatus}/>
            <MemberInfo profile={profile} getProfile={getUpdatedProfile}/>
        </div>
    )
}

export default MemberPage;