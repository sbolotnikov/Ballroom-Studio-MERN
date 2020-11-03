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
  }

}