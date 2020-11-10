import React, { Fragment, useEffect, useState } from "react";
import { Table } from 'react-bootstrap';


function InvoiceTable(props) {
    console.log(props);
    
    
    const [localArr, setLocalArray] = useState([]);
    const [localTotal, setLocalTotal] = useState(0);
    useEffect(() => {
        let locale=[];
        let totalLocal=0;
        console.log(props)
      for (let i=0; i<props.sess.length; i++){
        totalLocal+=props.sess[i].price*(100-props.sess[i].discount)/100*props.sess[i].numberOfSessions;
        locale.push({
            session: props.sess[i].session,
            price: props.sess[i].price,
            amount: props.sess[i].numberOfSessions,
            discount: props.sess[i].discount,
            total:(props.sess[i].price*(100-props.sess[i].discount)/100*props.sess[i].numberOfSessions).toFixed(2)
        })
      }
      setLocalArray(locale);
      setLocalTotal(totalLocal)
     console.log(locale);
    }, [props]);

    function handleDeleteItem(event){
        // console.log(indexItem); 
        props.onChange(event.target.value);  
    }

    return (
        <Fragment>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Session Type</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>Totals</th>
                    </tr>
                </thead>
                <tbody>
                    {localArr && localArr.map((item,j)=>{
                        return(
                    <tr>
                        <td>{j+1}.</td>
                        <td>{item.session}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.discount}</td>
                        <td>{item.total}</td>
                        <td><button id={"b"+j} value={j} onClick={handleDeleteItem}>Delete</button></td>
                    </tr>)
                 })}
                </tbody>
            </Table>
    <h3>Total for invoice before final discount : <span>{localTotal}</span></h3>

        </Fragment>
    );
}
export default InvoiceTable;