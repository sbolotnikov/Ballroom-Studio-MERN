import React from 'react';

function MemberRow(props) {
    return (
        <tr>
            <th scope="row">{props.employeeId}</th>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
            <td>{props.phoneNumber}</td>
        </tr>
    )
};

export default MemberRow;