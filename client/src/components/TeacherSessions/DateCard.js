import React, {useState, useEffect} from 'react';
import StudentRow from './StudentRow';
import API from '../../utils/API';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

function DateCard(props) {
    const [students, setStudents] = useState([]);

    // useEffect(() => {
    //     API.getRegisteredStudents(props.sessionId).then( results => {
    //         setStudents(results.data);
    //         console.log(results.data);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // },[props.sessionId]);

    const handleGetStudents = () => {
        API.getRegisteredStudents(props.sessionId, props.date).then( results => {
            setStudents(results.data);
            console.log(results.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle onClick={handleGetStudents} as={Button} variant="link" eventKey={props.date}>
                    {moment(props.date).format("LLLL")}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={props.date}>
                <Card.Body>
                    {students.map(student => 
                        <StudentRow 
                            key={student._id}
                            firstName={student.firstName}
                            lastName={student.lastName}
                            isPresent={student.userSessions[0].isPresent}
                            date={props.date}/>)}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default DateCard;