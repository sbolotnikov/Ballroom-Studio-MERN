import React, { Fragment, useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import compareValues from '../../utils/compareValues';

function InvoicePayment(props) {
    console.log(props);

    const [localTotal, setLocalTotal] = useState(0);

    useEffect(() => {
        let totalLocal = 0;
        for (let i = 0; i < props.payment.length; i++) {
            totalLocal += parseFloat(props.payment[i].amount);
        }
        setLocalTotal(totalLocal)
    }, [props]);

    function handleDeletePayment(event) {
        // console.log(indexItem); 
        props.onChange(event.target.value);
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {props.payment && props.payment.sort(compareValues('date', 'desc')).map((item, j) => {
                        return (
                            <tr>
                                <td>{j + 1}.</td>
                                <td><input type="date" value={item.date} /></td>
                                <td><input type="number" value={item.amount} /></td>
                                <td><button className="cuteBtn">{item.isPaid ? "Paid" : "Not Paid"}</button></td>
                                <td><button className="cuteBtn" id={"b" + j} value={j} onClick={handleDeletePayment}>Delete</button></td>
                            </tr>)
                    })}
                </tbody>
            </Table>
            <h3>Total payments amount : <span>{localTotal}</span></h3>

        </Fragment>
    );
}
export default InvoicePayment;