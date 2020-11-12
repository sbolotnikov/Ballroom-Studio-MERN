import React, {useState} from 'react';
import API from '../../utils/API';
import Select from 'react-select';

const level = [
    { value: 'social foundation', label: 'Social Foundation' },
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'bronze', label: 'Bronze' },
    { value: 'open', label: 'Open' },
];

const status = [
    {value: 'student', label: 'Student'},
    {value: 'teacher', label: 'Teacher'},
    {value: 'admin', label: 'Administrator'},    
];

const styles = {
    fontSize: "12px"
}

function MemberRow(props) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [certLevel, setCertLevel] = useState(props.certLevel);
    const [memberStatus, setMemberStatus] = useState(props.memberStatus[0]);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleUpdate = () => {
        API.levelUpUser(props.memberId, {
            certLevel: certLevel,
            memberStatus: [memberStatus]
        }).then( () => {
            setIsDisabled(true);
        }).catch( err => {
            console.log(err);
        })
    }

    const handleDelete = () => {
        API.deleteUser(props.memberId).then( () => {
            console.log("member deleted");
            props.loadMembers();
        })
    }

    const handleChange = (event) => {
        console.log(event.value);
        // const {name, value} = event.target;
        // if (name === "certLevel") {
        //     setCertLevel(value);
        // } else if (name === "memberStatus") {
        //     setMemberStatus(value);
        // }

    }

    const activateSelect = () => {
        setIsDisabled(!isDisabled);
    }

    const activateDelete = () => {
        setConfirmDelete(!confirmDelete);
    }

    return (
        <tr  style={styles}>
            <td >{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
            <td>{props.birthday}</td>
            <td>{props.age}</td>
            <td>
                <Select
                className="basic-single"
                defaultValue={{value: props.certLevel, label: props.certLevel}}
                isDisabled={isDisabled}
                name="certLevel"
                options={level}
                onChange={handleChange}/>
            </td>
            <td><Select
                className="basic-single"
                defaultValue={{value: props.memberStatus[0], label: props.memberStatus[0]}}
                isDisabled={isDisabled}
                name="memberStatus"
                options={status}
                onChange={handleChange}/>
            </td>
            <td>
                {isDisabled ? <button className="btn btn-secondary" onClick={activateSelect}>Update</button> :
                <button className="btn btn-warning" onClick={handleUpdate}>CONFIRM UPDATE</button> }
            </td>
            <td>
                {!confirmDelete ? <button className="btn btn-secondary" onClick={activateDelete}>Delete</button> :
                <button className="btn btn-danger" onClick={handleDelete}>CONFIRM DELETE</button> }
            </td>
        </tr>
    )
};

export default MemberRow;