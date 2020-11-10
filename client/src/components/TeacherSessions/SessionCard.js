import React, {useState, useEffect} from 'react';
import StudentRow from './StudentRow';
import API from '../../utils/API';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DateCard from './DateCard';

function SessionCard(props) {
    const [sessionDates, setSessionDates] = useState([]);

    useEffect(() => {
        setSessionDates(props.dates);
        // console.log(sessionDates);
    },[props.dates]);

    return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={props.id}>
                        {props.name} -  {props.type}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.id}>
                        <Card.Body>
                            <Accordion>
                                {sessionDates.map(date => <DateCard key={date} date={date} sessionId={props.id}/>)}
                            </Accordion>
                        </Card.Body>
                </Accordion.Collapse>
            </Card>
    )
};

export default SessionCard;
