import React, { useState, useEffect } from 'react';
import TableHeadings from './TableHeadings';
import TableBody from './TableBody';
import MemberRow from './MemberRow';
import SearchForm from '../SearchForm.js/SearchForm';
import API from '../../utils/API';

function MemberTable() {
    const [members, setMembers] = useState([]);

    useEffect( () => {
        API.getAllMembers().then( members => {
            setMembers(members);
        }).catch( err => {
            console.log(err);
        });
    },[]);

    const sortAsc = (key) => {
        setMembers({
            members: members.sort( (a, b) => {
                if(a[key] > b[key]) return 1;
                if(a[key] < b[key]) return -1;
                return 0;
            })
        })
    }
    const sortDesc = (key) => {
        setMembers({
            members: members.sort( (a, b) => {
                if(b[key] > a[key]) return 1;
                if(b[key] < a[key]) return -1;
                return 0;
            })
        })
    }

    const filterRecords = (key, value) => {
        let filteredMembers = members.filter( member => {
            return (member[key] === value)
        })

        setMembers({ members: filteredMembers })
    }

    const showAllRecords = () => {
        setMembers({members: members});
    }

    return (
        <div>
            <SearchForm filterRecords={filterRecords} showAll={showAllRecords}/>
            <table className="container table table-striped">
                <TableHeadings sortAsc={sortAsc} sortDesc={sortDesc}/>
                <TableBody>
                {members.map( member => 
                    <MemberRow 
                        memberId={member.id}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        email={member.email}
                        phoneNumber={member.phoneNumber}
                        key={`key${member.id}`}
                    />
                )}
                </TableBody>
            </table>
        </div>
    )  
};

export default MemberTable;