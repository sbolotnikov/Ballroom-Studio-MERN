import React from 'react';
import "./style.css";

// ROUGH DRAFT OF INVOICE -
// Feel free to modify, add to, or abandon 

// let printBtn = document.querySelector("#printInvoice");
// let emailBtn = document.querySelector(".email");
// let id = emailBtn.getAttribute("data-id");

// printBtn.addEventListener("click", () => {
//   window.print();
// }); 

// emailBtn.addEventListener("click", () => {
//   fetch("API CALL" + id, {type: "GET"}).then((response) => {
//     return response.json();
//   })
//   .then(function (body) {
//     console.log(body)
//   });
// }); 
function Invoice(props) {
    return (
        <div id="invoice">

            <div className="toolbar hidden-print">
                <div className="textPrpt">
                    <button id="SESSION NUMBER FOR API CALL GOES HERE" className="cuteBtn email" aria-label="email"><i className="fa fa-envelope"></i>
                    </button>
                    <button id="printInvoice" className="cuteBtn" aria-label="print"><i className="fa fa-print"></i></button>
                </div>
                <hr></hr>
            </div>

            <div className="invoice">
                <div style={{ minWidth: "600px" }}>
                    <header>
                        <div className="row">

                            <a target="_blank" href="/" className="ml-4">
                                <i className="fa fa-music textPrp fa-5x textRed"></i>
                            </a>
                            <h1 className="mainFont">MERN Studios</h1>

                            <div className="col company-details">
                                <h2 className="name">
                                    <a target="_blank" href="https://www.github.com/nlamonaco86" className="textRed">
                                        MERN Studios
                            </a>
                                </h2>
                                <div>123 Fake Street, Anytown NJ 07204</div>
                                <div><a className="textRed" href="tel:9085551234">(908) 555-1234</a></div>
                                <div><a className="textRed" href="mailto:mernstudios@gmail.com">mernstudios@gmail.com</a></div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="row contacts">
                            <div className="col invoice-to">
                                <div className="">INVOICE TO:</div>
                                <h2 className="to">FirstName LastName</h2>
                                <div className="address">555 Any Lane Apt #2A, BigCity NY 12212</div>
                                <div className=""><a href="mailto:email" className="textRed">customer@email.com</a></div>
                            </div>
                            <div className="col invoice-details">
                                <h1 className="">INVOICE: #12345678</h1>
                                <div className="date">DATE</div>
                                <div className="date">className TYPE</div>
                                <div className="date">SKILL LEVEL</div>
                            </div>
                        </div>
                        <table border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="">DESCRIPTION</th>
                                    <th className="">HOURLY RATE</th>
                                    <th className="">HOURS</th>
                                    <th className="">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="no">01</td>
                                    <td className="">
                                        <h3 class="">Dance Lesson</h3>Description of the Lesson
                            </td>
                                    <td className="unit">$99.00</td>
                                    <td className="qty">2</td>
                                    <td className="total">$198.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">SUBTOTAL</td>
                                    <td>$198.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">+ NJ Sales Tax</td>
                                    <td>$13.12</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">TOTAL</td>
                                    <td>$211.12</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="thanks">Thank you!</div>
                        <div className="notices">
                            <div>NOTICE:</div>
                            <div className="notice">Any important or relevant information could appear here.
                    </div>
                        </div>
                    </main>
                    <footer>
                        Thank you for viewing my demonstration of MERN Studios' invoice system.
            </footer>
                </div>
                {/* <div></div> */}
            </div>
        </div>
    );
}
export default Invoice;
