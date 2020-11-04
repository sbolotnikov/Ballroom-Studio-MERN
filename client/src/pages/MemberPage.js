import React, { useContext }from 'react';
import MemberInfo from '../components/MemberInfo';
import Navbar from '../components/Navbar/navbar';
import UserContext from '../utils/UserContext';

function MemberPage(){

    const {userId} = useContext(UserContext);

    return (
        <div>
            <Navbar></Navbar>
            <MemberInfo></MemberInfo>
        </div>
    )
}

export default MemberPage;