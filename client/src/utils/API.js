import axios from 'axios';

export default {
    login: (user) => {
        return axios.post("/api/login", user);
    },
    signup: (user) => {
      return axios.post("/api/signup", user);
  },
  profile: ()=>{
    return axios.get("/api/profile")
  }

}