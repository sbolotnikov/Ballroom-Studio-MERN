import React, {useContext, useState} from 'react';
import AttendanceListContext from '../../utils/AttendanceListContext';

function StudentRow(props) {
    const [checked, setChecked] = useState(false);
    const {students} = useContext(AttendanceListContext);

    const checkAttendance = (event) => {
        
    }

    return (
        <div>
            {props.firstName} {props.lastName} - {props.isPresent ? "present" : 
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={props.id} onChange={checkAttendance}/>
                        <label className="form-check-lable">Present?</label>
                    </div>}
        </div>
    )
};

export default StudentRow;
