import React from 'react';
import MemberInfo from '../components/MemberInfo';
import MemberNav from '../components/MemberNav';

function MemberPage(){

    return (
        <div>
            <MemberNav />
            <MemberInfo></MemberInfo>
        </div>
    )
}

export default MemberPage;