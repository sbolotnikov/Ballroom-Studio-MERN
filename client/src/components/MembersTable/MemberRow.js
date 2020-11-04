import React from 'react';

function MemberRow(props) {
    return (
        <tr>
            <td >{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
            <td>{props.birthday}</td>
            <td>{props.age}</td>
            <td>{props.memberStatus[0]}</td>
        </tr>
    )
};

export default MemberRow;