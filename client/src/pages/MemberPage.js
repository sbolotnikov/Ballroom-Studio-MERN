import React, { useContext }from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';

function MemberPage(){

    const {userId} = useContext(UserContext);

    return (
        <div>
            <MemberNav />
            <MemberInfo></MemberInfo>
        </div>
    )
}

export default MemberPage;