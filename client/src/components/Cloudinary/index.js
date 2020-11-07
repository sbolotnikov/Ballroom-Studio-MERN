import React from 'react';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Cloudinary(props) {
    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDNAME,
            uploadPreset: process.env.REACT_APP_CLOUD_PRESET
        }, (error, result) => {
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info.secure_url);
                props.getImgUrl(result.info.secure_url); 
              }
        });
        widget.open();
    }

    return(
        <div>
            <button id="upload_widget" className="cloudinary-button" onClick={showWidget}>Upload a Profile Image</button>
        </div>
    )
}

export default Cloudinary;