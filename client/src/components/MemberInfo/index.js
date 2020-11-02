import React, { useState } from 'react';
import API from '../../utils/API';

function MemberInfo() {
    const [profile, setProfile] = useState({});


    return (
        <div className="container">
            <div className="formTop d-flex justify-content-center mt-4">Member Profile (update once APIs are implemented)</div>
        </div>
    )
};

export default MemberInfo;