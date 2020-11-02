import axios from 'axios';

export default {
    login: (user) => {
        return axios.post("/api/login", user);
    },
    signup: (user) => {
      return axios.post("/api/signup", user);
  },
  root:()=>{
    return axios.get("/")
  },
  profile: ()=>{
    return axios.get("/api/profile")
  }

}