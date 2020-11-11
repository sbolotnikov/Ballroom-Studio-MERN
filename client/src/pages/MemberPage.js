import React, {useEffect, useState} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';

function MemberPage(){
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = () => {
            let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
            API.getProfile().then(results => {
                if (results.data.profilePhotoUrl) {
                    imgLink = results.data.profilePhotoUrl;
                }
                setImgDisplay(imgLink);
                setProfile(results.data);
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
            <MemberNav imgLink={imgDisplay}/>
            <MemberInfo profile={profile} getProfile={getUpdatedProfile}/>
        </div>
    )
}

export default MemberPage;