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
      return axios.get("/api/steps/pm_out")
    },
    getSessionsByType: (type) => {
      return axios.get(`/api/session_dates/sessionType/${type}`);
    },
    getSessionsByAdult: (isAdult) => {
      return axios.get(`/api/session_dates/adult/${isAdult}`);
    },
    getSessionsByMonth: (month) => {
      return axios.get(`/api/session_dates/month/${month}`);
    },
    getUserProfile: (id)=>{
      return axios.get(`/api/profile/${id}`);
    },
    registerForSession: (id, session) => {
      return axios.put(`/api/register/sessions/${id}`, session);
    },
    getMySessions: (month) => {
      return axios.get(`/api/my_sessions/month/${month}`);
    },
    getTeacherSessions: (id) => {
      return axios.get(`/api/sessions/teacher/${id}`);
    },
    getRegisteredStudents: (sessionId, date) => {
      return axios.get(`/api/session/registered_students/${sessionId}/${date}`);
    },
    postStudentAttendance: (sessionId, attendanceArr) => {
      return axios.put(`/api/session/attendance/${sessionId}`, attendanceArr);
    },
    getMembersByType: (type)=> {
      console.log("in API outgoing DM");
      return axios.get(`/api/members/${type}`);
    },
}