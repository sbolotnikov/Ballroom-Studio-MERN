import React from "react";
import { Col, Row } from 'react-bootstrap';
import "./style.css";
export default
    function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <Row>
                <Col>
                <button style={{ background:"transparent", border:"0", boxShadow:"0", float: "right" }} onClick={props.clearError}>X</button>
                <h4 style={{ flex: "center", color: "black",fontFamily: "serif" }}>WARNING</h4>
                   
                </Col>

            </Row>
            <Row>
                <Col xs={12} sm={6}>
                    <div dangerouslySetInnerHTML={{ __html: props.message }} />

                </Col>
                <Col xs={12} sm={6}>
                    <img style={{ width: "100px" }} src={process.env.PUBLIC_URL + "./imgs/Zid2.gif"} alt="Attention!" />
                </Col>
            </Row>



        </div>
    );
}