import React, { useState, useEffect } from 'react';
import TableHeadings from './TableHeadings';
import TableBody from './TableBody';
import MemberRow from './MemberRow';
import SearchForm from '../SearchForm';
import API from '../../utils/API';

let allMembers = []

function MemberTable() {
    const [members, setMembers] = useState([]);

    useEffect( () => {
        loadMembers();
        return setMembers([]);
    },[]);

    const sortAsc = (key) => {
        let sortedMembers = [...members];
        setMembers(
          sortedMembers.sort( (a, b) => {
                if(a[key] > b[key]) return 1;
                if(a[key] < b[key]) return -1;
                return 0;
            })
        )
    }
    const sortDesc = (key) => {
        let sortedMembers = [...members];
        setMembers(
            sortedMembers.sort( (a, b) => {
                if(b[key] > a[key]) return 1;
                if(b[key] < a[key]) return -1;
                return 0;
            })
        )
    }

    const filterRecords = (key, value) => {
        let filteredMembers = members.filter( member => {
            return (member[key] === value)
        })

        setMembers(filteredMembers )
    }

    const showAllRecords = () => {
        setMembers(allMembers);
    }

    const loadMembers = () => {
        API.getAllMembers().then( members => {
            setMembers(members.data);
           allMembers = members.data;
           console.log(allMembers);
        }).catch( err => {
            console.log(err);
        });
    }

    return (
        <div>
            <SearchForm filterRecords={filterRecords} showAll={showAllRecords}/>
            <div className="table-responsive">
            <table className="table table-striped">
                <TableHeadings sortAsc={sortAsc} sortDesc={sortDesc}/>
                <TableBody>
                {members.map( member => 
                    <MemberRow 
                        memberId={member.id}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        email={member.email}
                        phoneNumber={member.phoneNumber}
                        birthday={member.birthday ?member.birthday.slice(0,10):"undefined"}
                        age={member.age}
                        certLevel={member.certLevel}
                        memberStatus={member.memberStatus}
                        key={`key${member.id}`}
                        loadMembers={loadMembers}
                    />
                )}
                </TableBody>
            </table>
            </div>
        </div>
    )  
};

export default MemberTable;