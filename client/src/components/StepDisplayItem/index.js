import React from 'react';
import "./style.css";
import moment from 'moment';
import { Col } from "react-bootstrap";
function StepDisplayItem(props) {

    let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
    if (props.message) {
        return (
            <Col xs={12} className="stepStyle d-flex pr-0 pt-2" style={{ flexWrap: "wrap" }} >
                { props.profileImg ? <img src={props.profileImg} alt='profile picture' className="img_style" /> :
                    <img src={imgLink} alt='profile picture' className="img_style" />}

                <div className="media-body" id={props.id}>
                    <h5 className="mt-0 pl-2" style={{ maxWidth: "992px", flexWrap: "wrap" }}>{props.name}</h5>
                    <p style={{ paddingLeft: "5px", maxWidth: "992px", flexWrap: "wrap" }}>{props.message}</p>
                    <p className="mt-0 pl-2">{moment(props.time).format("h:mma on dddd")}</p>
                </div>
                {(props.status === "teacher") || (props.status === "admin") || (props.authorid === props.userid) ? <button type="submit" className="btn btn-danger float-right mr-1" value={props.id}>Delete</button> : <div></div>}
            </Col>
        )
    }
    else { return (<h5 className="mt-0">No messages yet!</h5>) }
};

export default StepDisplayItem;      
