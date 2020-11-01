import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import dmAPI from '../../utils/dmAPI';

const socket = io();


function Messaging() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect( () => {

    }, []);

    function getDMHistory() {
        getAllDMs().then( results => {
            console.log(results);
            setMessages(results);
        })
    };


    function handleSendMessage(event) {
        event.preventDefault();
        dmAPI.emitDM(event.target.value)
        
    };

    function handleReceivedMessages() {

    };

    function handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        setMessage({
            [name]: value
        });
    };
    
    return ( 
        <div>
            <ul id="messages">

            </ul>
            <form onSubmit={handleSendMessage}>
                <input id="message" autocomplete="off" type="text" 
                    name="message" value={message} onChange={handleInputChange}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Messaging;