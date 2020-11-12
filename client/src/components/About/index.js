import React from 'react';
import "./style.css";

function About(props) {
    // const [show, setShow] = useState(true);
    return (
        <div>
            <section className="page-section blue text-white mb-0 mt-2" id="about">
                <div className="container">

                    <div className="text-center" id="about">
                        <h2 className="page-section-heading d-inline-block heading">About</h2>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-4 ml-auto lead">
                            <p>MERN Ballroom Studio is a group project utilizing MongoDB, Express, React, and Node.js in addition to other technologies such as (LIST THEM HERE).</p>
                            <p>Users can sign up for a personalized account to represent their skill level, then view the calendar of events and sign up for one that interests them.</p>
                            <p> Instructors can edit the schedule of events, track attendance, and perform other management related functions. A community platform "Steps" allows for users and instructors to communicate with each other.</p>
                        </div>
                        <div className="col-lg-4 mr-auto lead">
                            <p>Although MERN Ballroom studio is themed in the style of ballroom dance, it is a practical and agile application that can be refactored for use in any sort of community based setting. </p>
                            <p>A previous iteration of our project used Node.js, Express, Sequelize, Express-Sessions, Passport.js and Handlebars to create an interactive scheduling, community, and attendance management platform in the theme of a martial arts studio.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section" id="contact">
                <div className="container">

                    <div className="text-center">
                        <h2 className="page-section-heading d-inline-block heading">Contact</h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-5 ml-auto lead mt-4">
                            <p><a href="https://github.com/sbolotnikov" className="gitHeader">Sergey Bolotnikov</a></p>
                            <p>Database architect and lover of ballroom dance.</p>
                            <p><a href="sbolotnikov@gmail.com">sbolotnikov@gmail.com</a></p>
                            <p><a href="https://github.com/jmc846" className="gitHeader">Jonathan Cobb</a></p>
                            <p>Front End Development.</p>
                            <p><a href="mailto:jmc846@scarletmail.rutgers.edu">jmc846@scarletmail.rutgers.edu</a></p>
                        </div>
                        <div className="col-lg-5 ml-auto lead mt-4">
                            <p><a href="https://github.com/mc4506" className="gitHeader">Michael Chen</a></p>
                            <p>Back End Development.</p>
                            <p><a href="mike4506@gmail.com">mike4506@gmail.com</a></p>
                            <p><a href="https://github.com/nlamonaco86" className="gitHeader">Nicholas La Monaco</a></p>
                            <p>Front End Development.</p>
                            <p><a href="mailto:nlamonaco86@gmail.com">nlamonaco86@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;
