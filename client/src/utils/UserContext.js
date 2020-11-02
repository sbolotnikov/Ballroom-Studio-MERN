import {createContext} from 'react';

const UserContext=createContext({
 email: "",
 setEmail: ()=>{},
 loggedIn: false,
 setLoggedIn: ()=>{},

});

export default UserContext