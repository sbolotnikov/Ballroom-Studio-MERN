import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import "./style.css";
import API from '../../utils/API';
import compareValues from '../../utils/compareValues';

function DMincoming() {
    const [dmIncoming, setDMIncoming] = useState([]);
    let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
    useEffect(() => {
        API.getIncomingDM().then(results => {

            var res = results.data.sort(compareValues('updatedAt', 'desc'));
            console.log(res)
            setDMIncoming(res)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleCheckbox(e, dmIndex) {
        API.updateDMConfirm(e.target.value).then(results => {
            const changedDM = [...dmIncoming];
            changedDM[dmIndex].confirm = true;
            setDMIncoming(changedDM);
        }).catch(err => {
            console.log(err);
        })
    }
    
    function handleDeleteDM(e, dmIndex) {
        console.log(e.target.value);
        API.deleteOneStep(e.target.value).then(results => {
            const changedDM = [...dmIncoming];
            changedDM.splice(dmIndex, 1);
            setDMIncoming(changedDM);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            {/* <h4 className="stepsTitle">Incoming messages</h4> */}
            <div style={{ background: "white", opacity: .9, flexWrap: "nowrap", color: "black" }}>
                {dmIncoming && dmIncoming.map((dm, j) => {
                    return (
                        <Row value={j}>
                            <Col xs={4} sm={5}>
                                <img src={dm.author.profilePhotoUrl ? dm.author.profilePhotoUrl : imgLink} alt='profile avatar' className="img_style" />
                            </Col>
                            <Col xs={8} sm={7} style={{ background: dm.confirm ? "white" : "red" }} >
                                <div className="media-body" id={dm._id}>
                                    <p>{moment(dm.updatedAt).format("h:mma on dddd")} </p>

                                    <p className="mt-0"><strong>{dm.author.firstName + " " + dm.author.lastName}</strong></p>
                                    <p style={{ flexWrap: "wrap" }}>{dm.message}</p>
                                    {!dm.confirm ? <input type="checkbox" name={"box-" + j} value={dm._id} onClick={event => handleCheckbox(event, j)} /> : <div></div>}
                                </div>
                                <button style={{ color: "blue", float: "right" }} value={dm._id} onClick={event => handleDeleteDM(event, j)} className="cuteBtn">x</button>
                            </Col>
                            {/* {(props.status === "teacher") || (props.status === "admin") || (props.authorid === props.userid) ? <button type="submit" className="btn btn-danger float-right" value={props.id}>Delete</button> : <div></div>} */}
                        </Row>
                    )
                })}
            </div>


        </Fragment>
    );
}
export default DMincoming;