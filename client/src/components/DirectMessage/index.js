import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import "./style.css";
import API from '../../utils/API';
import compareValues from '../../utils/compareValues';
import Select from 'react-select';

function DirectMessage() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [members, setMembers] = useState([]);
    const [dm, setDM] = useState('');
   
    useEffect(() => {
        API.getAllMembers().then(results => {
            var res = results.data.sort(compareValues('lastName'));
            var options = [];
            for (let j = 0; j < res.length; j++) {
                options.push({ value: res[j]._id, label: res[j].lastName + '_' + res[j].firstName })
            }
            setMembers(options)
        }).catch(err => {
            console.log(err);
        })
    }, []);



    function handleSendDM() {
        console.log(selectedOption);
        console.log(dm);
        // add 
        let newDM = {};
        for (let j = 0; j < selectedOption.length; j++) {
            newDM = { adressTo: selectedOption[j].value, message: dm }
            API.postPM(newDM).then(results => {
                console.log("success add DM");              
            }).catch(err => {
                console.log(err);
            });
        }
        document.querySelector("#dm-box").value = "";
        // setSelectedOption(null);
    }
    return (
        <div>
            <Row>
                <Col>
                    {members && <Select options={members} className="stepsItem" closeMenuOnSelect={false}
                        isMulti defaultValue={selectedOption} onChange={setSelectedOption} />}
                    <textarea className="form-control mt-1" rows="3" id="dm-box" onChange={event => setDM(event.target.value)}
                        placeholder="Enter your direct message Here!"></textarea>
                    <div className="d-flex justify-content-center">
                        <button id="dm-submit" className="btn btn-danger" onClick={handleSendDM}
                            style={{ marginLeft: "10px" }}>Submit!</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col >

                </Col>
            </Row>



        </div>
    );
}
export default DirectMessage;