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
  postStep: (item)=> {
    return axios.post("/api/steps/new_step",item)
  },
  getSetSteps: (topic)=>{
    console.log("got to API"+topic)
    return axios.get("/api/steps/"+topic)
  }
}