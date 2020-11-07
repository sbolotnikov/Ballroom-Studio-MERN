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
  getAllMembers: ()=> {
    return axios.get("/api/all_members");
  },
  createSession: (session) => {
    return axios.post("api/new_session", session);
  },

}