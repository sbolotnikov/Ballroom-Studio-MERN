import React, { useEffect, useState, useContext, Fragment } from "react";
import { Table } from 'react-bootstrap';
import API from '../../utils/API';
import moment from 'moment';
import compareValues from '../../utils/compareValues';
import MemberNav from '../../components/MemberNav';
import { useHistory } from "react-router-dom";
import UserContext from '../../utils/UserContext';

// import Invoice from '../../components/Invoice';

function Invoices() {
    const { invoiceId, setInvoiceId } = useContext(UserContext);
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});
    const [invoices, setInvoices] = useState([]);
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
        let imgLink = process.env.PUBLIC_URL + "./imgs/defaultIcon.png";
        API.getProfile().then(results => {
            if (results.data.profilePhotoUrl) {
                imgLink = results.data.profilePhotoUrl;
            }
            setImgDisplay(imgLink);
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
            <MemberNav imgLink={imgDisplay} />

            <Table responsive striped bordered hover>
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
            </Table>
            <button className="cuteBtn" value={''} onClick={handleEditInvoice}>Add</button>

        </Fragment>
    )
}

export default Invoices;
