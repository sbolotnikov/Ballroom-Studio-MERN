import React from "react";
import { Col, Row } from 'react-bootstrap';
import "./style.css";
export default
    function ErrorNotice(props) {
        var topval = `calc(20%)`, leftval = `calc(20%)`;
    return (
        // <div className={"error-notice d-flex flex-column justify-content-center  position-absolute"} style={{left: props.left, top: props.top}}>

        <div className="error-notice" style={{left: leftval, top: topval, flexWrap: "wrap"}}>
            <Row>
                <Col>
                <button style={{ background:"transparent", border:"0", boxShadow:"0", float: "right" }} onClick={props.clearError}>X</button>
                <h4 style={{ flex: "center", color: "#A71D31",fontFamily: "serif" }}>WARNING</h4>
                   
                </Col>

            </Row>
            <Row>
                <Col xs={12} sm={6}>
                    <div dangerouslySetInnerHTML={{ __html: props.message }} />

                </Col>
                <Col xs={12} sm={6}>
                    <img style={{ width: "100px" }} src={process.env.PUBLIC_URL + "./imgs/nodance.png"} alt="Attention!" />
                </Col>
            </Row>



        </div>
    );
}