import React from 'react';
import "./style.css";
import moment from 'moment';

function StepDisplayItem(props) {

    let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
    if (props.message) {
        return (
            <figure className="stepStyle d-flex">
                { props.profilePhotoUrl ? <img src={props.profilePhotoUrl} alt='profile picture' className="img_style" /> :
                    <img src={imgLink} alt='profile picture' className="img_style" />}

                <div className="media-body" id={props.id}>
        <h5 className="mt-0">{props.name}</h5>
        <p style={{maxWidth: "992px", minWidth: "576px"}}>{props.message}</p>
                    <p>{moment(props.time).format("h:mma on dddd")}</p>
                </div>                                  
                {(props.status === "teacher") || (props.status === "admin")|| (props.authorid===props.userid)  ? <button type="submit" className="btn btn-danger float-right" value={props.id}>Delete</button> : <div></div> }
            </figure>
        )
    }
    else { return (<h5 className="mt-0">No messages yet!</h5>) }
};

export default StepDisplayItem;      
