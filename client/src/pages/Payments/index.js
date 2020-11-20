import React, { useEffect, useState, Fragment } from "react";
import { Col, Row } from 'react-bootstrap';
import "./style.css";
import API from '../../utils/API';
import compareValues from '../../utils/compareValues';
import Select from 'react-select';
import MemberNav from '../../components/MemberNav';
import Switch from '../../components/Switch';
import InvoiceTable from '../../components/InvoiceTable';
import InvoicePayment from '../../components/InvoicePayment';
import ErrorNotice from "../../components/misc/errorNotice";

// import Invoice from '../../components/Invoice';

function Payments() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [profile, setProfile] = useState({});
    const [members, setMembers] = useState([]);
    const [amount, setAmount] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [payment, setPayment] = useState(1);
    const [wholeDiscount, setWholeDiscount] = useState(0);
    const [dateX, setDate] = useState(0);
    const [expirationDate, setExDate] = useState(0);
    const [box, setBox] = useState(false);
    const [errorstate, setErrorState] = useState(false);
    const [buySessions, setBuySessions] = useState([]);
    const [payments, setPayments] = useState([]);
    const [contractPrice, setContractPrice] = useState(0);



    const priceList = [{ value: 100, label: "private" }, { value: 25, label: "group" }, { value: 15, label: "party" }];

    useEffect(() => {
        getProfile();

        API.getMembersByType("student").then(results => {
            var res = results.data.sort(compareValues('lastName'));
            var options = [];
            for (let j = 0; j < res.length; j++) {
                options.push({ value: res[j]._id, label: res[j].lastName + '_' + res[j].firstName })
            }
            setMembers(options)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const getProfile = () => {
        API.getProfile().then(results => {
            setProfile(results.data);
        }).catch(err => {
            console.log(err);
        })
    }

    function handleGrandTotalChange(addlast) {
        let total = addlast;
        console.log(total)
        for (let i = 0; i < buySessions.length; i++) {
            total += buySessions[i].price * (100 - buySessions[i].discount) / 100 * buySessions[i].numberOfSessions;
        }
        if (wholeDiscount) {
            total = total * (100 - wholeDiscount) / 100;
        }
        console.log(total)
        document.getElementById("totalPrice").value = "";
        setContractPrice(parseFloat(total).toFixed(2))
    }



    const handleAddSessions = (event) => {
        event.preventDefault()
        if ((!selectedType) || (!amount) || (!discount)) {
            setErrorState("Please do not skip the inputs");
            return;
        }
        if ((selectedType <= 0) || (amount <= 0) || (discount < 0)) {
            setErrorState("Inputs should be more then 0");
            return;
        }
        let sessionsSet = {
            sessionType: selectedType.label,
            price: selectedType.value,
            numberOfSessions: amount,
            discount: discount
        }
        const changedArray = [...buySessions];
        changedArray.push(sessionsSet);
        setBuySessions(changedArray);
        handleGrandTotalChange(parseFloat(sessionsSet.price) * (100 - parseFloat(sessionsSet.discount)) / 100 * parseFloat(sessionsSet.numberOfSessions));
    }

    function handleDeleteItem(newValue) {
        const changedArray = [...buySessions];
        let value = (buySessions[newValue].price * (100 - buySessions[newValue].discount) / 100 * buySessions[newValue].numberOfSessions).toFixed(2)
        changedArray.splice(newValue, 1);
        setBuySessions(changedArray);
        handleGrandTotalChange(0 - value)
    }

    const handleAddPayment = (event) => {
        event.preventDefault();
        if (payment <= 0) {
            setErrorState("Payment should be more then 0");
            return;
        }
        if (!dateX){
            setErrorState("Enter the date!");
            return; 
        }
        let paymentSet = {
            date: dateX,
            amount: payment,
            isPaid: box
        }
        const changedArray = [...payments];
        changedArray.push(paymentSet);
        setPayments(changedArray);
        console.log(payments);
    }

    function handleDeletePayment(newValue) {
        console.log("erase index" + newValue);
        const changedArray = [...payments];
        changedArray.splice(newValue, 1);
        setPayments(changedArray);
    }
    function handleWholeDiscount(e) {
        setWholeDiscount(e.target.value);
        if (contractPrice > 0) {
            handleGrandTotalChange(0);
        }
    }
    function handleSubmitInvoice(e){
        if (!selectedStudent) {
            setErrorState("Please select student");
            return;
        }
        if (payments.length<1) {
            setErrorState("Please enter payment options");
            return;
        }
        if (buySessions.length<1) {
            setErrorState("sessions can not be blank!");
            return;
        }
        let invoice={
            manager: [profile._id],
            customer:[selectedStudent.value],
            installments: payments,
            expirationDate: expirationDate,
            sessions:buySessions,
            discount:wholeDiscount 
        };
        API.postNewInvoice(invoice).then(results=>{
            console.log(results);
            setBuySessions([]);
            setPayments([]);

        }).catch(err => {
            console.log(err);
        })
        

    }


    return (
        <Fragment>
            <MemberNav />
            <div className="container">
            {/* <Invoice /> */}
            <Row>
                <Col lg={4}>
                    {members && <Select width='300px' menuColor='red'
                        options={members} defaultValue={selectedStudent} onChange={setSelectedStudent} />}
                    {errorstate && (<ErrorNotice message={errorstate} left={40} top={40} clearError={() => setErrorState(undefined)} />)}
                    <Select width='300px' menuColor='red'
                        options={priceList} defaultValue={selectedType} onChange={setSelectedType} />
                    <label for="inpAmount">Amount of Units:</label><br />
                    <input type="number" className="form-control mt-1" name="inpAmount" id="amount" min={.5} max={50} onChange={event => setAmount(event.target.value)} />
                    <label for="inpDisc">Discount in %:</label><br />
                    <input type="number" className="form-control mt-1" name="inpDisc" id="discount" min={0} max={100} onChange={event => setDiscount(event.target.value)} />
                    <button type="submit" id="submitSession" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleAddSessions} >Add</button>
                    <br />
                    <label for="inpWholeDiscount">Discount on whole contract:</label>
                    <input type="number" className="form-control mt-1" name="inpWholeDiscount" id="wholeDiscount" min={0} max={100} onChange={handleWholeDiscount} />
                    <label for="inpExDate">Expiration Date:</label><br />
                    <input type="date" className="form-control mt-1" name="inpExDate" id="exDate" onChange={event => setExDate(event.target.value)} />
                    <h3>GRAND TOTAL : $</h3> <h3 id="totalPrice">{contractPrice}</h3>
                </Col>
                <Col lg={8}>
                    <InvoiceTable sess={buySessions} onChange={handleDeleteItem} />
                </Col>
                <Col lg={4}>
                    <label for="inpPayment">Payment Amount:</label><br />
                    <input type="number" className="form-control mt-1" name="inpPayment" id="payment" min={0} onChange={event => setPayment(event.target.value)} />
                    <label for="inpDate">Date:</label><br />
                    <input type="date" className="form-control mt-1" name="inpDate" id="date" onChange={event => setDate(event.target.value)} />
                    <label for="inpBox">Was a payment made?: {box && <strong style={{ color: "#faa65c" }}>{box ? "Yes" : "No"}</strong>}</label>
                    <Switch
                        isOn={box}
                        onColor="#152a61"
                        handleToggle={() => setBox(!box)}
                    />

                    <button type="submit" id="submitSession" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleAddPayment} >Add</button>
                </Col>
                <Col lg={8}>
                    <InvoicePayment payment={payments} onChange={handleDeletePayment} />
                    <button type="submit" id="submitSession" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleSubmitInvoice} >Submit invoice</button>
                </Col>
            </Row>
            </div>
        </Fragment>
    )
}

export default Payments;