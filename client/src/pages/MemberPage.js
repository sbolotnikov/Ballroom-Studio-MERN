import React, {useEffect, useState, useContext} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';

function MemberPage(){
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});
    const [memberStatus, setMemberStatus] = useState([]);

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
                // console.log(results.data);
                // console.log("got profile");
            }).catch(err => {
                console.log(err);
            })
        }
        getProfile();
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