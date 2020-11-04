import React from 'react';

const styles = {
    span: {
        cursor: "pointer"
    }
}

class TableHeading extends React.Component {
 
    handleSortAsc = (event) => {
        //use data-key to get name of key to pass as argument into sort methods
        this.props.sortAsc(event.target.dataset.key);
    }
    handleSortDesc = (event) => {
        this.props.sortDesc(event.target.dataset.key);
    }

    render() {
        return (
            <thead>
                <tr>
                    <th scope="col">First Name 
                        <span data-key="firstName" style={styles.span} onClick={this.handleSortAsc}>&#9650;</span>
                        <span data-key="firstName" style={styles.span} onClick={this.handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">Last Name
                        <span data-key="lastName" style={styles.span} onClick={this.handleSortAsc}>&#9650;</span>
                        <span data-key="lastName" style={styles.span} onClick={this.handleSortDesc}>&#9660;</span>
                    </th>
                    <th scope="col">Email
                        <span data-key="email" style={styles.span} onClick={this.handleSortAsc}>&#9650;</span>
                        <span data-key="email" style={styles.span} onClick={this.handleSortDesc}>&#9660;</span>                
                    </th>
                    <th scope="col">Phone Number
                        <span data-key="phoneNumber" style={styles.span} onClick={this.handleSortAsc}>&#9650;</span>
                        <span data-key="phoneNumber" style={styles.span} onClick={this.handleSortDesc}>&#9660;</span>
                    </th>
                </tr>
            </thead>
        )
    }
}

export default TableHeading;