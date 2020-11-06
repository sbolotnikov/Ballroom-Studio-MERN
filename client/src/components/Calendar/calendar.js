import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./calendar.css";

function CalendarOld(props) {
    // const [show, setShow] = useState(true);
    return (
        <div className="container mt-4 white">
            <div id="calendar-wrap">
                <header>
                    <h1>NOVEMBER 2020</h1>
                </header>
                <div id="calendar">
                    <ul className="weekdays">
                        <li>Sunday</li>
                        <li>Monday</li>
                        <li>Tuesday</li>
                        <li>Wednesday</li>
                        <li>Thursday</li>
                        <li>Friday</li>
                        <li>Saturday</li>
                    </ul>


                    <ul className="days">
                        <li className="day other-month">
                            <div className="date">27</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">28</div>
                            <div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    1:00pm to 3:00pm
                        </div>
                            </div>
                        </li>
                        <li className="day other-month">
                            <div className="date">29</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">30</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">31</div>
                        </li>


                        <li className="day">
                            <div className="date">1</div>
                        </li>
                        <li className="day">
                            <div className="date">2</div>
                            <div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    2:00pm to 5:00pm
                        </div>
                            </div>
                        </li>
                    </ul>



                    <ul className="days">
                        <li className="day">
                            <div className="date">3</div>
                        </li>
                        <li className="day">
                            <div className="date">4</div>
                        </li>
                        <li className="day">
                            <div className="date">5</div>
                        </li>
                        <li className="day">
                            <div className="date">6</div>
                        </li>
                        <li className="day">
                            <div className="date">7</div>
                            <div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    6:00pm to 8:30pm
                        </div>
                            </div>
                        </li>
                        <li className="day">
                            <div className="date">8</div>
                        </li>
                        <li className="day">
                            <div className="date">9</div>
                        </li>
                    </ul>


                    <ul className="days">
                        <li className="day">
                            <div className="date">10</div>
                        </li>
                        <li className="day">
                            <div className="date">11</div>
                        </li>
                        <li className="day">
                            <div className="date">12</div>
                        </li>
                        <li className="day">
                            <div className="date">13</div>
                        </li>
                        <li className="day">
                            <div className="date">14</div><div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    1:00pm to 3:00pm
                        </div>
                            </div>
                        </li>
                        <li className="day">
                            <div className="date">15</div>
                        </li>
                        <li className="day">
                            <div className="date">16</div>
                        </li>
                    </ul>

                    <ul className="days">
                        <li className="day">
                            <div className="date">17</div>
                        </li>
                        <li className="day">
                            <div className="date">18</div>
                        </li>
                        <li className="day">
                            <div className="date">19</div>
                        </li>
                        <li className="day">
                            <div className="date">20</div>
                        </li>
                        <li className="day">
                            <div className="date">21</div>
                        </li>
                        <li className="day">
                            <div className="date">22</div>
                            <div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    9:00am to 12:00pm
                        </div>
                            </div>
                        </li>
                        <li className="day">
                            <div className="date">23</div>
                        </li>
                    </ul>

                    <ul className="days">
                        <li className="day">
                            <div className="date">24</div>
                        </li>
                        <li className="day">
                            <div className="date">25</div>
                            <div className="event">
                                <div className="event-desc">
                                    Sample Event
                        </div>
                                <div className="event-time">
                                    1:00pm to 3:00pm
                        </div>
                            </div>
                        </li>
                        <li className="day">
                            <div className="date">26</div>
                        </li>
                        <li className="day">
                            <div className="date">27</div>
                        </li>
                        <li className="day">
                            <div className="date">28</div>
                        </li>
                        <li className="day">
                            <div className="date">29</div>
                        </li>
                        <li className="day">
                            <div className="date">30</div>
                        </li>
                    </ul>

                    <ul className="days">
                        <li className="day">
                            <div className="date">31</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">1</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">2</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">3</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">4</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">5</div>
                        </li>
                        <li className="day other-month">
                            <div className="date">6</div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default CalendarOld;