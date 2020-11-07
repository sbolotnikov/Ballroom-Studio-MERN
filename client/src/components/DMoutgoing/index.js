import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import API from '../../utils/API';
import compareValues from '../../utils/compareValues';

function DMoutgoing() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [members, setMembers] = useState([]);
    const [dm, setDM] = useState('');

    useEffect(() => {

    }, []);



    return (
        <div>
            <Row>
                <Col>
                   
                </Col>
            </Row>
            <Row>
                <Col >

                </Col>
            </Row>



        </div>
    );
}
export default DMoutgoing;