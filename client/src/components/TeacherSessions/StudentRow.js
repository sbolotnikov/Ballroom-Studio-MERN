import React from 'react';

function StudentRow(props) {
    return (
        <div>
            {props.firstName} {props.lastName} - {props.isPresent ? "present" : 
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={props.id} />
                        <label className="form-check-lable">Present?</label>
                    </div>}
        </div>
    )
};

export default StudentRow;
