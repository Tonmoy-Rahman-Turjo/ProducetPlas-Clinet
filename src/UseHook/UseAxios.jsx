import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import UseAuth from "./UseAuth";


const publicAxios = axios.create({
    //  baseURL: 'http://localhost:5000'
     baseURL: 'https://elevent-serversite.vercel.app/'
})
const UseAxios = () => {
        //  const navegat = useNavigate()
        //  const {signOute} = UseAuth()
      publicAxios.interceptors.request.use(function(config){
        
        const token = localStorage.getItem('access-token')
        // console.log('request', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
      publicAxios.interceptors.response.use(function(response){
        return response
      }, async (error)=>{
        const status = error.response.status;
        if (status === 401 || status === 403) {
        //   await signOute();
        //   navegat("/login")
             }
        return Promise.reject(error)
      })
    return   publicAxios
    
};

export default UseAxios;