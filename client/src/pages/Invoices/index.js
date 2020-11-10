import React, { useEffect, useState, Fragment } from "react";
import { Table } from 'react-bootstrap';
import API from '../../utils/API';
import moment from 'moment'
import compareValues from '../../utils/compareValues';
import MemberNav from '../../components/MemberNav';
import ErrorNotice from "../../components/misc/errorNotice";

// import Invoice from '../../components/Invoice';

function Invoices() {
    const [imgDisplay, setImgDisplay] = useState('');
    const [profile, setProfile] = useState({});
    const [invoices, setInvoices] = useState([]);

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
        console.log(e.target.value)
    }
    function handleDeleteInvoice(e){
        console.log(e.target.value)
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


        </Fragment>
    )
}

export default Invoices;
