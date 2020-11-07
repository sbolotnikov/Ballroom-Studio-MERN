import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import API from '../../utils/API';
import compareValues from '../../utils/compareValues';

function DMincoming() {
    const [dmIncoming, setDMIncoming] = useState([]);

    useEffect(() => {
        API.getIncomingPM().then(results => {

            // var res = results.data.sort(compareValues('updatedAt', 'desc'));
            var res = results.data;
            console.log(res)
            setDMIncoming(res)
        }).catch(err => {
            console.log(err);
        })
    }, []);



    return (
        <Fragment>
            <Row>
                <Col>
                   
                </Col>
            </Row>
            <Row>
                <Col >

                </Col>
            </Row>



        </Fragment>
    );
}
export default DMincoming;