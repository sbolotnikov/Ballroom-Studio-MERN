import axios from 'axios';
import io from 'socket.io-client';
const socket = io();

export default {

    sendDM: (msg, recipient) => {
        return axios.post(`/api/steps/dm/${recipient}`, msg);
    },
    
    getAllDMs: (recipient) => {
        return axios.get(`/api/steps/dm/${recipient}`);
    },
    
    emitDM: (msg) => {
        return socket.emit("steps dm", msg);
    }
}

