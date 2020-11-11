import React from 'react';

const styles = {
    span: {
        cursor: "pointer"
    },
    th: {
        minWidth: "200px"
    }
}

function TableHeading (props) {
 
    const handleSortAsc = (event) => {
        //use data-key to get name of key to pass as argument into sort methods
        props.sortAsc(event.target.dataset.key);
    }
    const handleSortDesc = (event) => {
        props.sortDesc(event.target.dataset.key);
    }

        return (
            <thead>
                <tr>
                    <th scope="col">First Name 
                        <span data-key="firstName" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="firstName" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">Last Name
                        <span data-key="lastName" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="lastName" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">Email
                        <span data-key="email" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="email" style={styles.span} onClick={handleSortDesc}>&#9660;</span>                
                    </th>
                    <th scope="col">Phone Number
                        <span data-key="phoneNumber" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="phoneNumber" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">BirthDay
                        <span data-key="birthday" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="birthday" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">Age
                        <span data-key="age" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="age" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col" style={styles.th}>Level
                        <span data-key="certLevel" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="certLevel" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col" style={styles.th}>Role
                        <span data-key="memberStatus" style={styles.span} onClick={handleSortAsc}>&#9650;</span>
                        <span data-key="memberStatus" style={styles.span} onClick={handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">  
                    </th>
                    <th scope="col">
                    </th>
                </tr>
            </thead>
        )
    
}

export default TableHeading;