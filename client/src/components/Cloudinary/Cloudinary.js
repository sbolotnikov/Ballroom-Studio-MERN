import React from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import 'https://widget.cloudinary.com/v2.0/global/all.js'

function Cloudinary() {
    const showWidget = (widget) => {
        widget.open();
    }

    let widget = window.cloudinary.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_CLOUD_PRESET
    }, (error, result) => {});

    return(
        <div>
            <button id="upload_widget" className="cloudinary-button" onClick={showWidget}>Upload files</button>
        </div>
    )
}

export default Cloudinary;