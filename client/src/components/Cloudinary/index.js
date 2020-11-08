import React from 'react';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Cloudinary(props) {
    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDNAME,
            uploadPreset: process.env.REACT_APP_CLOUD_PRESET,
            styles:{
                palette: {
                  window: "#faa65c",
                  windowBorder: "#152a61",
                  tabIcon: "#152a61",
                  menuIcons: "#5A616A",
                  textDark: "#000000",
                  textLight: "#FFFFFF",
                  link:  "#0078FF",
                  action:  "#FF620C",
                  inactiveTabIcon: "#152a61",
                  error: "#F44235",
                  inProgress: "#0078FF",
                  complete: "#20B832",
                  sourceBg: "#faa65c"
                },
            }
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