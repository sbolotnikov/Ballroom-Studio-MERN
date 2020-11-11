import React from 'react';
import "./style.css";

function SignupHeader(props) {
    // const [show, setShow] = useState(true);
    return (
        <div>
            <section className="page-section text-white mb-0" id="about">
                <div className="container">

                    <div className="text-center" id="about">
                        <h2 className=" d-inline-block heading">Our Studio</h2>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-4 text-dark ml-auto lead">
                            <p>MERN Ballroom Studio welcomes ballroom dance enthusiasts of all skill levels. </p>
                           </div>
                        <div className="col-lg-4 text-dark mr-auto lead">
                            <p>Sign up today with a student or guest account - we'd love to get to know you.</p>
                           </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignupHeader;
