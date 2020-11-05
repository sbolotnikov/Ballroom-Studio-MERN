import "./style.css";
import React, { useState, useEffect } from "react";
import MemberNav from '../../components/MemberNav';
import StepsList from '../../components/StepsList';
import API from '../../utils/API';
import ErrorNotice from "../../components/misc/errorNotice";
import { isValidObjectId } from "mongoose";
function Steps() {
    const [addtopic, setAddTopic] = useState('');
    const [topic, setTopic] = useState('');
    const [errorstate, setErrorState] = useState(false);
    const [topicsArray, setTopicsArray] = useState([]);
    const [addstep, setAddStep] = useState('')
    const [stepsSet, setStepsSet] = useState([]);

    useEffect(() => {
        API.allTopics().then(results => {
            console.log(results.data[0]._id);
            setTopicsArray(results.data);
            // console.log(topicsArray);
            setTopic(results.data[0]._id);
            console.log(topic);
        }).then(() => {

            API.getSetSteps(topic).then(res1 => {
                setStepsSet(res1.data);
                console.log(res1)
            }).catch(err => {
                setStepsSet([])
                console.log(err);
            });
        }).catch(err => {

            console.log(err);
        });

    }, []);



    function handleAddTopic() {

        // add 
        if (addtopic.length >= 1) {
            API.addNewTopic({ topic: addtopic }).then(results => {
                document.querySelector("#topic").value = "";
                console.log("success add topic");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        } else {
            setErrorState("topic must be at least 1 symbol")
        }
    }

    function handleDelTopic() {
        console.log(topic)
        // add 

        API.deleteTopic(topic).then(results => {
            console.log("success delete topic");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });

    }
    function handleAddStep() {
        console.log(topic)
        // add 
        let newStep = { topic: topic, message: addstep }
        API.postStep(newStep).then(results => {
            console.log("success add Step");
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });

    }
    return (
        <div>
            <MemberNav />
            <div className="container">

                <h2 className="display-4 font-weight-bold pad">Welcome <span className="member"></span></h2>

                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="text-light align-middle">
                        <video autoPlay muted loop id="myVideo" className="d-none d-md-block">
                            <source src={process.env.PUBLIC_URL + "./imgs/studiovideo.mp4"} type="video/mp4" />
                        </video>
                        <img
                            src={process.env.PUBLIC_URL + "./imgs/dance.jpg"}
                            alt="avatar"
                            className="d-md-none" id="smScreenBg" width="500"
                        />
                        <div className="container">
                            <div className="d-flex flex-row justify-content-center">
                                <div className="col-lg-8">

                                    <input type="text" className="form-control"  placeholder="Add new topic"
                                        onChange={event => setAddTopic(event.target.value)} />
                                    {errorstate && (<ErrorNotice message={errorstate} left={40} top={40} clearError={() => setErrorState(undefined)} />)}
                                    <div className="d-flex justify-content-center">
                                        <button id="topicAdd" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleAddTopic} >Add</button>
                                    </div>

                                    <p className="cool-font" for="topics">Choose a Topic:</p>
                                    <figure id="topicChoice">
                                        <select name="topics" className="stepsItem" id="topics" onChange={event => setTopic(event.target.value)}>



                                            {topicsArray.map((topic, j) => {
                                                return (
                                                    <option value={topic._id} className="stepsItem" id={"topic" + j}>{topic.topic}</option>
                                                )
                                            })}





                                        </select>
                                    </figure>

                                    <div className="d-flex justify-content-center">
                                        <button id="topicDel" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleDelTopic} >Delete</button>
                                    </div>

                                    <p className="cool-font">Kick</p>
                                    <textarea className="form-control" rows="3" id="step-box" onChange={event => setAddStep(event.target.value)}
                                        placeholder="Enter your Step-tweet Here!"></textarea>
                                    <div className="d-flex justify-content-center">
                                        <button id="step-submit" className="btn btn-danger" onClick={handleAddStep}
                                            style={{ marginLeft: "10px" }}>Submit!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="cool-font">Steps list:</h2>
                        <hr />


                        {stepsSet.map((step, j) => {
                            return (
                                <h3 id={step._id} className="stepsItem" id={"step" + j}>{step.message}</h3>
                            )
                        })}


                        <StepsList />
                    </div>
                </div>



            </div>


        </div>
    )
}

export default Steps;