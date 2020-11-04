import {createContext} from 'react';

const UserContext=createContext({
 email: "",
 setEmail: ()=>{},
 loggedIn: false,
 setLoggedIn: ()=>{},
 id: "",
 setUserId: ()=>{}

});

export default UserContext