import React, {useEffect, useState, useContext} from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';
import API from '../utils/API';
import UserContext from '../utils/UserContext';

function MemberPage(){
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});
    const {setUserId} = useContext(UserContext);

    useEffect(() => {
        
        getProfile();

    }, []);

    const getProfile = () => {
        let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
        API.getProfile().then(results => {
            setUserId(results.data._id);
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

    return (
        <div>
            <MemberNav imgLink={imgDisplay}/>
            <MemberInfo profile={profile} getProfile={getProfile}/>
        </div>
    )
}

export default MemberPage;