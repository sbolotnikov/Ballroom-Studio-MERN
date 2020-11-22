import "./style.css";
import React, { useState, useEffect } from "react";
import MemberNav from '../../components/MemberNav';
import DirectMessage from '../../components/DirectMessage';
import DMincoming from '../../components/DMincoming';
import DMoutgoing from '../../components/DMoutgoing';
import Switch from '../../components/Switch';
import StepDisplayItem from '../../components/StepDisplayItem';
import API from '../../utils/API';
import ErrorNotice from "../../components/misc/errorNotice";
import { Col, Row } from "react-bootstrap";


function Steps() {
    const [profile, setProfile] = useState({});
    const [addtopic, setAddTopic] = useState('');
    const [topic, setTopic] = useState('');
    const [errorstate, setErrorState] = useState(false);
    const [topicsArray, setTopicsArray] = useState([]);
    const [addstep, setAddStep] = useState('')
    const [stepsSet, setStepsSet] = useState([]);
    const [box, setBox] = useState(true);

    useEffect(() => {
        setTopicState();

        API.getProfile().then(results => {
            setProfile(results.data);

        }).catch(err => {
            console.log(err);
        })
    }, []);
    function setTopicState() {
        API.allTopics().then(results => {
            setTopicsArray(results.data);
            // console.log(topicsArray);
            setTopic(results.data[0]._id);
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

    }
    return (
        <div>
            <MemberNav />
            <div className="container">

                <h2 className="formTop d-flex justify-content-center ">Welcome, {profile.firstName} <span className="member"></span></h2>

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
                            <Row className="d-flex flex-row justify-content-center">
                                <Col md={4}>
                                    <h4 className="formTop d-flex justify-content-center mt-4">Direct messages:</h4>
                                    <DirectMessage />

                                    <h4 className="stepsTitle">{(box) ? "Incoming messages" : "Outgoing messages"}</h4>
                                    <Switch
                                        isOn={box}
                                        onColor="#152a61"
                                        handleToggle={() => setBox(!box)}
                                    />
                                    {(box) ? <DMincoming /> : <DMoutgoing />}


                                </Col>
                                <Col md={8}>
                                    <h4 className="formTop d-flex justify-content-center mt-4">Latest hot topics:</h4>
                                    <input type="text" className="form-control" id="topic" placeholder="Add new topic"
                                        onChange={event => setAddTopic(event.target.value)} />
                                    {errorstate && (<ErrorNotice message={errorstate} left={40} top={40} clearError={() => setErrorState(undefined)} />)}
                                    <div className="d-flex justify-content-center">
                                        <button id="topicAdd" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleAddTopic} >Add</button>
                                    </div>

                                    <h4 className="stepsTitle">Choose a Topic:</h4>

                                    <figure id="topicChoice">
                                        <select name="topics" className="stepsItem" id="topics" onChange={topicChange}>
                                            <option value={0} className="stepsItem mt-4" id={"topic0"}></option>
                                            {topicsArray.slice(0).reverse().map((topic, j) => {
                                                return (
                                                    <option value={topic._id} className="stepsItem" id={"topic" + j}>{topic.topic} by {topic.author ? topic.author.firstName + '' + topic.author.lastName: "DELETED USER"} </option>
                                                )
                                            })}

                                        </select>
                                    </figure>

                                    <div className="d-flex justify-content-center">
                                        <button id="topicDel" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleDelTopic} >Delete</button>
                                        {/* {(profile.memberStatus === ["teacher"]) || (profile.memberStatus === ["admin"]) ? <button id="topicDel" className="cuteBtn" style={{ marginLeft: "10px" }} onClick={handleDelTopic} >Delete</button> : <div></div>} */}
                                    </div>

                                    <p className="formTop d-flex justify-content-center  mt-4">Step</p>
                                    <textarea className="form-control" rows="3" id="step-box" onChange={event => setAddStep(event.target.value)}
                                        placeholder="Enter your Step-tweet Here!"></textarea>
                                    <div className="d-flex justify-content-center">
                                        <button id="step-submit" className="cuteBtn" onClick={handleAddStep}
                                            style={{ marginLeft: "10px" }}>Submit!</button>
                                    </div>
                                    <Row className="d-flex flex-row justify-content-center">
                                        {/* <Row> */}
                                        <Col lg={12} onClick={handleDelStepSubmit}>
                                            <h2 className="stepsTitle">Steps list:</h2>
                                            <hr />
                                            {stepsSet.slice(0).reverse().map((step, j) => {
                                                return (
                                                    // <h3 id={step._id} className="stepsItem" id={"step" + j}>{step.message}</h3>
                                                    <StepDisplayItem
                                                        id={step._id}
                                                        message={step.message}
                                                        time={step.updatedAt}
                                                        name={step.author ? step.author.firstName + ' ' + step.author.lastName : "Deleted User"}
                                                        profileImg={step.author ? step.author.profilePhotoUrl:process.env.PUBLIC_URL + "./imgs/defaultIcon.png"}
                                                        status={profile.memberStatus[0]}
                                                        authorid={step.author ? step.author.email: ""}
                                                        userid={profile.email} />
                                                )
                                            })}
                                        </Col>
                                        {/* </Row> */}
                                    </Row>

                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Steps;