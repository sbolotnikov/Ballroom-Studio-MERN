import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import MemberNav from '../../components/MemberNav';
import StepDisplayItem from '../../components/StepDisplayItem';
import API from '../../utils/API';
import ErrorNotice from "../../components/misc/errorNotice";
import { isValidObjectId } from "mongoose";
import { Col, Row } from "react-bootstrap";
function Steps() {
    const [profile, setProfile] = useState({});
    const [addtopic, setAddTopic] = useState('');
    const [topic, setTopic] = useState('');
    const [errorstate, setErrorState] = useState(false);
    const [topicsArray, setTopicsArray] = useState([]);
    const [addstep, setAddStep] = useState('')
    const [stepsSet, setStepsSet] = useState([]);

    useEffect(() => {
        setTopicState();
        API.getProfile().then(results => {
            console.log()
            setProfile(results.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);
    function setTopicState() {
        API.allTopics().then(results => {
            console.log(results.data[0]._id);
            setTopicsArray(results.data);
            // console.log(topicsArray);
            setTopic(results.data[0]._id);
            console.log(topic);
        }).then(() => {
            document.querySelector("#topics").options[0].selected = 'true';
        })
            .catch(err => {

                console.log(err);
            });
    }
    function getSetofSteps(topicref) {
        API.getSetSteps(topicref).then(res1 => {
            setStepsSet(res1.data);
            console.log(res1)
        }).catch(err => {
            setStepsSet([])
            console.log(err);
        });


    }


    function handleAddTopic() {

        // add 
        if (addtopic.length >= 1) {
            API.addNewTopic({ topic: addtopic }).then(results => {
                document.querySelector("#topic").value = "";
                console.log("success add topic");
            }).then(() => {
                setTopicState()
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
        API.deleteTopicSteps(topic).then(res => {
            console.log("success delete all topic steps");
        }).then(() => {
            API.deleteTopic(topic).then(results => {
                console.log("success delete topic");
            }).then(() => {
                // window.location.reload();
                getSetofSteps(topic);
            }).catch(err => {
                console.log(err);
            });
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
            document.querySelector("#step-box").value = "";
        }).then(() => {
            getSetofSteps(topic);
        }).catch(err => {
            console.log(err);
        });

    }
    const topicChange = (event) => {
        setTopic(event.target.value);
        console.log(topic)
        getSetofSteps(event.target.value);
    }
    function handleDelStepSubmit(event) {
        if (event.target.value) {

            API.deleteOneStep(event.target.value).then(results => {
                console.log("success delete Step");
            }).then(() => {
                getSetofSteps(topic);
            }).catch(err => {
                console.log(err);
            });
        }
        console.log(event.target.value)

    }
    return (
        <div>
            <MemberNav />
            <div className="container">

                <h2 className="stepsTitle display-4 font-weight-bold pad">Welcome, {profile.firstName} <span className="member"></span></h2>

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

                                    <input type="text" className="form-control" id="topic" placeholder="Add new topic"
                                        onChange={event => setAddTopic(event.target.value)} />
                                    {errorstate && (<ErrorNotice message={errorstate} left={40} top={40} clearError={() => setErrorState(undefined)} />)}
                                    <div className="d-flex justify-content-center">
                                        <button id="topicAdd" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleAddTopic} >Add</button>
                                    </div>

                                    <h4 className="stepsTitle">Choose a Topic:</h4>
                                    <figure id="topicChoice">
                                        <select name="topics" className="stepsItem" id="topics" onChange={topicChange}>
                                            <option value={0} className="stepsItem" id={"topic0"}></option>
                                            {topicsArray.slice(0).reverse().map((topic, j) => {
                                                return (
                                                    <option value={topic._id} className="stepsItem" id={"topic" + j}>{topic.topic} by {topic.author.firstName+''+topic.author.lastName} </option>
                                                )
                                            })}

                                        </select>
                                    </figure>

                                    <div className="d-flex justify-content-center">
                                        <button id="topicDel" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleDelTopic} >Delete</button>
                                        {/* {(profile.memberStatus === ["teacher"]) || (profile.memberStatus === ["admin"]) ? <button id="topicDel" className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={handleDelTopic} >Delete</button> : <div></div>} */}
                                    </div>

                                    <p className="stepsTitle">Step</p>
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
                <Row className="d-flex flex-row justify-content-center">
                    {/* <Row> */}
                    <Col lg={8} onClick={handleDelStepSubmit}>
                        <h2 className="stepsTitle">Steps list:</h2>
                        <hr />
                        {stepsSet.slice(0).reverse().map((step, j) => {
                            return (
                                // <h3 id={step._id} className="stepsItem" id={"step" + j}>{step.message}</h3>
                                <StepDisplayItem
                                    id={step._id}
                                    message={step.message}
                                    time={step.updatedAt}
                                    name={step.author.firstName + ' ' + step.author.lastName}
                                    profileImg={step.author.profilePhotoUrl}
                                    status={profile.memberStatus[0]}
                                    authorid={step.author.email}
                                    userid={profile.email} />
                            )
                        })}
                    </Col>
                    {/* </Row> */}
                </Row>



            </div>


        </div>
    )
}

export default Steps;