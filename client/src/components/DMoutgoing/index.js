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
        API.getOutgoingDM().then(results => {

            var res = results.data.sort(compareValues('updatedAt', 'desc'));
            console.log(res)
            setDMIncoming(res)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    
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
            <div style={{ background: "white", opacity: .9, flexWrap: "nowrap", color: "black" }}>
                {dmIncoming && dmIncoming.map((dm, j) => {
                    return (
                        <Row value={j}>
                            <Col xs={4} sm={3}>
                                <img style={{padding:"5px 0 0 5px" }} src={dm.dm_recipient && dm.dm_recipient.profilePhotoUrl ? dm.dm_recipient.profilePhotoUrl : imgLink} alt='profile avatar' className="img_style" />
                            </Col>
                            <Col xs={8} sm={9} style={{ background: dm.confirm ? "white" : "red" }} >
                                <div className="media-body" id={dm._id}>
                                    <p>{moment(dm.updatedAt).format("h:mma on dddd")} </p>
                                    {dm.dm_recipient ? <p className="mt-0"><strong>{dm.dm_recipient.firstName + " " + dm.dm_recipient.lastName}</strong></p>: <p>You wrote to Deleted User</p>}
                                    <p style={{ flexWrap: "wrap" }}>{dm.message}</p>
                                </div>
                                <button className="cuteBtn" style={{ color: "blue", float: "right" }} value={dm._id} onClick={event => handleDeleteDM(event, j)}>x</button>
                            </Col>
                        </Row>
                    )
                })}
            </div>


        </Fragment>
    );
}
export default DMincoming;