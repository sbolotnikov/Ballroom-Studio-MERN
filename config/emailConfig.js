const email = {
    // each k:v pair can be a different kind of email, stored here and called when needed
    // just need to use inline styling with nodemailer
    // a marketing email, event reminder, birthday/anniversary/thank you, weekly newsletter, etc.
    marketing: `<div style="padding-right: 150px;padding-left: 150px;margin-right: auto;margin-left: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px; background-color: #152a61; color: white;">
    <h1 style="display: flex; justify-content: center; color: #faa65c; font-size: 54px;">About Us</h1>
    <p>MERN Ballroom Studio
        is a group project utilizing MongoDB, Express, React, and Node.js in
        addition to other technologies such as Nodemailer, and more.</p>
    
    <p> Users can sign up for
        a personalized account to represent their skill level, then view the
        calendar of events and sign up for one that interests them.</p>
    
    <p> Instructors can edit
        the schedule of events, track attendance, and perform other management
        related functions. A community platform called "Steps" allows for users and instructors to communicate with each
    other publicly or directly.</p>
    
    <p>Although MERN Ballroom studio is themed in the style of ballroom dance, it is a practical and
        agile application that can be refactored for use by any event-based bussiness or in any sort of community.
    </p>
    <p>A previous iteration of our project used Node.js, Express, Sequelize, Express-Sessions,
        Passport.js and Handlebars to create an interactive scheduling, community, and attendance
        management platform in the theme of a martial arts studio.</p>
    
    <div style="display: flex; justify-content: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">
        <div>
            <p style="display: flex; justify-content: center;"><a href="https://github.com/sbolotnikov" style="color: #a71d31; font-size: 32px; text-decoration: none; font-weight: bold;">Sergey Bolotnikov</a></p>
            <p style="display: flex; justify-content: center;">Database architect and lover of ballroom dance.</p>
            <p style="display: flex; justify-content: center;"><a href="sbolotnikov@gmail.com" style="color: #faa65c; font-size: 20px; text-decoration: none; font-weight: bold;">sbolotnikov@gmail.com</a></p>
            <p style="display: flex; justify-content: center;"><a href="https://github.com/jmc846" style="color: #a71d31; font-size: 32px; text-decoration: none; font-weight: bold; padding-top: 25px;">Jonathan Cobb</a></p>
            <p style="display: flex; justify-content: center;">Full Stack Development.</p>
            <p style="display: flex; justify-content: center;"><a href="mailto:jmc846@scarletmail.rutgers.edu" style="color: #faa65c; font-size: 20px; text-decoration: none; font-weight: bold;">jmc846@scarletmail.rutgers.edu</a></p>
            <p style="display: flex; justify-content: center;"><a href="https://github.com/mc4506" style="color: #a71d31; font-size: 32px; text-decoration: none; font-weight: bold; padding-top: 25px;">Michael Chen</a></p>
            <p style="display: flex; justify-content: center;">Full Stack Development.</p>
            <p style="display: flex; justify-content: center;"><a href="mike4506@gmail.com" style="color: #faa65c; font-size: 20px; text-decoration: none; font-weight: bold;">mike4506@gmail.com</a></p>
            <p style="display: flex; justify-content: center;"><a href="https://github.com/nlamonaco86" style="color: #a71d31; font-size: 32px; text-decoration: none; font-weight: bold; padding-top: 25px;">Nicholas La Monaco</a></p>
            <p style="display: flex; justify-content: center;">Full Stack Development & Presentation.</p>
            <p style="display: flex; justify-content: center;"><a href="mailto:nlamonaco86@gmail.com" style="color: #faa65c; font-size: 20px; text-decoration: none; font-weight: bold;">nlamonaco86@gmail.com</a></p>
    </div>
    </div>
    `
  };

module.exports = email;