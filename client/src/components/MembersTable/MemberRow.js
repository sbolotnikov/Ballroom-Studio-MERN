import React, {useState} from 'react';
import API from '../utils/API';
// import Select from 'react-select';

function MemberRow(props) {
    const [confirmDelete, setConfirmDelete] = useState(false);


    const handleUpdate = () => {
        API.levelUpUser(props.memberId, {
            certLevel: 
        })
    }

    const handleDelete = () => {

    }

    return (
        <tr>
            <td >{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
            <td>{props.birthday}</td>
            <td>{props.age}</td>
            <td>{props.certLevel}</td>
            <td>{props.memberStatus[0]}</td>
            <td><button className="cuteBtn" onClick={handleUpdate}>Update</button></td>
            <td><button className="cutBtn" onClick={handleDelete}>Delete</button></td>
        </tr>
    )
};

export default MemberRow;