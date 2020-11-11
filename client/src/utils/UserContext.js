import {createContext} from 'react';

const UserContext=createContext({
 email: "",
 setEmail: ()=>{},
 loggedIn: false,
 setLoggedIn: ()=>{},
 userId: "", 
 setUserId: ()=>{},
 invoiceId: "",
 setInvoiceId: ()=>{}
});

export default UserContext