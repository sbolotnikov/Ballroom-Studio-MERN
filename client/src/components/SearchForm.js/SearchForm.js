import React, {useState} from 'react';

const styles = {
    span: {
        color: "red"
    }
}

function SearchForm (props) {

    const [searchState, setSearchState] = useState({
        searchField: "---",
        searchTerm: ""
    });
    const [searchEntryValidation, setSearchEntryValidation] = useState({
        invalidSearchField: false,
        invalidSearchTerm: false
    });

    const handleInputChange = event => {
        // console.log(event.target.name);
        const value = event.target.value;
        const name = event.target.name;
    
        setSearchState({
          [name]: value
        });
    };

    const handleFilter = (event) => {
        // reset states
        setSearchState({
            invalidSearchField: false,
            invalidSearchTerm: false
        });
        event.preventDefault();
        if (searchState.searchField === '---') {
            setSearchEntryValidation({ invalidSearchField: true })
        } else if (searchState.searchTerm === '') {
            setSearchEntryValidation({ invalidSearchTerm: true })
        } else {
            props.filterRecords(searchState.searchField, searchState.searchTerm);
        }
    }

    const handleShowAll = (event) => {
        event.preventDefault();
        // reset drop down
        const searchFieldEl = document.getElementById("searchField");
        searchFieldEl.selectedIndex = 0;

         // reset all states
        setSearchState({
            searchTerm: ""
        });

        setSearchEntryValidation({
            invalidSearchField: false,
            invalidSearchTerm: false
        })
        props.showAll();
    }
    
        return (
            <form className="container p-4 bg-light">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="searchField">Select Field 
                            <span style={styles.span}>
                                {searchEntryValidation.invalidSearchField === true && ' Select a Search Field'}
                            </span></label>
                        <select className="form-control" id="searchField" 
                            name="searchField"
                            onChange={this.handleInputChange}>
                                <option value="---">---</option>
                                <option value="firstName">First Name</option>
                                <option value="lastName">Last Name</option>
                                <option value="certLevel">Certification Level</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="teacher">Administrator</option>
                        </select>
                    </div>
                    <div className="form-group col-md-8">
                        <label htmlFor="searchTerm">Enter Search Term
                            <span style={styles.span}>
                                {searchEntryValidation.invalidSearchTerm === true && ' Please enter search term'}
                            </span>
                        </label>
                        <input type="text" className="form-control" id="searchTerm"
                            name="searchTerm" 
                            value={searchState.searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary mx-4" onClick={handleFilter}>Search</button>
                    <button type="submit" className="btn btn-secondary" onClick={handleShowAll}>Clear Search</button>
                </div>
            </form>
        )
};

export default SearchForm;