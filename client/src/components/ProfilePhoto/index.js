import React from "react";

function ProfilePhoto(props) {
    return (
        <div>
            <img src={props.profilePhotoUrl} alt="Profile" className="member-photo" />
        </div>
    );
}

export default ProfilePhoto;