import React, { useState, useEffect, useContext } from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';


function StepsTopics(props) {
    const [profile, setProfile] = useState({});
   var topicArray=[];
   API.allTopics().then(results => {
    topicArray=results.data;
  }).catch(err => {
      console.log(err);
  });
    // console.log(loggedIn);


    useEffect(() => {
        
        API.getProfile().then(results => {
            console.log()
            setProfile(results.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <select name="topics" className="form-control" id="topics" >

{/*             
            {this.props.map((topic, i) => (
                <option value={topic._id}
                  employeeId={employee.id}
                  image={employee.image}
                  name={employee.name}
                  phone={employee.phone}
                  email={employee.email}
                  dob={employee.dob}
                  key={"employee-" + i}

                />
                <option value=''></option>
             */}

            </select>
            
        
    )
};

export default StepsTopics;