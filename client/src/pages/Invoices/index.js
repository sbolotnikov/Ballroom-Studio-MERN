import React, { useEffect, useState, useContext, Fragment } from "react";
import { Table } from 'react-bootstrap';
import API from '../../utils/API';
import moment from 'moment';
import compareValues from '../../utils/compareValues';
import MemberNav from '../../components/MemberNav';
import { useHistory } from "react-router-dom";
import UserContext from '../../utils/UserContext';
import ErrorNotice from "../../components/misc/errorNotice";

// import Invoice from '../../components/Invoice';

function Invoices() {
    const {loggedIn, setLoggedIn, invoiceId, setInvoiceId } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [errorstate, setErrorState] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getProfile();

        API.getAllInvoices().then(results => {
            console.log(results);
            setInvoices(results.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    const getProfile = () => {
        API.getProfile().then(results => {          
            setLoggedIn(!results.data.tempPassword);
            if (results.data.tempPassword) setErrorState("Please reset your password first");
            setProfile(results.data);
        }).catch(err => {
            console.log(err);
        })
    }
    function handleEditInvoice(e){
        console.log(e.target.value);
        setInvoiceId(e.target.value);
        history.push("/editInvoice");
    }
    function handleDeleteInvoice(e){
        API.deleteInvoice(e.target.value).then(results=>{
            console.log(results);
            window.location.reload(false);
            history.push("/invoices")
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <MemberNav />
            {errorstate && (<ErrorNotice message={errorstate} left={40} top={40} clearError={() => setErrorState(undefined)} />)}
            {loggedIn && <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Expiration Date</th>
                        <th>Totals</th>
                        <th>Paid to Date</th>
                        <th>Edit invoice</th>
                        <th>Delete invoice</th> 

                    </tr>
                </thead>
                <tbody>
                    {invoices && invoices.sort(compareValues('createdAt', 'desc')).map((item, j) => {
                        return (
                            <tr>
                                <td>{j + 1}.</td>
                                <td>{item.customer[0].firstName+ " "+item.customer[0].lastName }</td>
                                <td>{moment(item.createdAt).format("dddd, MMMM Do YYYY")} </td>
                                <td>{moment(item.expirationDate).format("dddd, MMMM Do YYYY")}</td>
                                <td>{item.invoiceTotal }</td>
                                <td>{item.paid}</td>
                                <td><button className="cuteBtn" id={"b" + j} value={item._id} onClick={handleEditInvoice}>Edit</button></td>
                                <td><button className="cuteBtn" id={"b" + j} value={item._id} onClick={handleDeleteInvoice}>Delete</button></td>
                            </tr>)
                    })}
                </tbody>
            </Table>}
            {loggedIn && <button className="cuteBtn" value={''} onClick={handleEditInvoice}>Add</button>}

        </Fragment>
    )
}

export default Invoices;
