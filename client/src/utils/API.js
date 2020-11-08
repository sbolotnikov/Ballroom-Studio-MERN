/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
    login: (user) => {
        return axios.post("/api/login", user);
    },
    signup: (user) => {
      return axios.post("/api/signup", user);
    },
    getProfile: ()=>{
      return axios.get("/api/profile")
    },
    logout: ()=> {
      return axios.get("/logout")
    },
    googleSignin: ()=>{
      return axios.get("/auth/google")
    },
    allTopics: ()=>{
      return axios.get("/api/steps/all_topics")
    },
    addNewTopic: (item)=> {
      return axios.post("/api/steps/new_topic", item)
    },
    deleteTopic: (item)=> {
      return axios.delete("/api/steps/topic/"+item)
    },
    deleteTopicSteps: (topic)=> {
      return axios.delete("/api/steps/"+topic)
    },
    deleteOneStep: (step)=> {
      return axios.delete("/api/steps/step/"+step)
    },
    postStep: (item)=> {
      return axios.post("/api/steps/new_step",item)
    },
    getSetSteps: (topic)=>{
      return axios.get("/api/steps/data/"+topic)
    },
    getAllMembers: ()=> {
      return axios.get("/api/all_members");
    },
    createSession: (session) => {
      return axios.post("api/new_session", session);
    },
    updateProfile: (userId, profile) => {
      return axios.put(`/api/profile/${userId}`, profile);
    },
    postPM: (pm) => {
      return axios.post("/api/steps/new_pm", pm);
    },
    getIncomingDM: () => {
      return axios.get("/api/steps/pm_in");
    },
    updateDMConfirm: (id)=> {
      return axios.put("/api/steps/dm/"+id)
    },
    getOutgoingDM: ()=>{
      console.log("in API outgoing DM");
      return axios.get("/api/steps/pm_out")
    }
}