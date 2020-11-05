import React, { useState , useEffect, useContext} from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';


function StepsList() {
    const [profile, setProfile] = useState({});
    const {loggedIn} = useContext(UserContext);

    console.log(loggedIn);

    
    useEffect( () => {
            API.getProfile().then( results => {
                console.log()
                setProfile(results.data);
            }).catch (err => {
                console.log(err);
            })
    }, [])


    return (
        <h2>Whole list of  svdgfn</h2>
    )
};

export default StepsList;