import React from 'react';

function StudentRow(props) {
    return (
        <div>
            {props.firstName} {props.lastName} {props.isPresent ? "present" : "not present"}
        </div>
    )
};

export default StudentRow;
