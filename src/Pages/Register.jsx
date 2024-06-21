import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import imges from '../assets/Login.gif'
  import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import UseAuth from "../UseHook/UseAuth";
import UseAxios from "../UseHook/UseAxios";
const Register = () => {
  const axiospublic = UseAxios()
  const {creatUser, updateuserProfile} = UseAuth()
  // console.log(creatUser)
    const [success, setSuccess] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const forms = location.state || '/'
    const [error, setError]= useState('')
    const [showpassword, setShowpassword] = useState(false)
    const handelregister = event =>{

        setError('')
        setSuccess('')
          event.preventDefault()
          const form = event.target;
           const displayName = form.displayName.value;
           const email = form.email.value;
           const password = form.password.value;
           const photoURL = form.photoURL.value;
           const register={displayName, email, password, photoURL}
           console.log(register)
    
           if(password.length <6 ){
            setError('please type 6 characters or long password')
            return
           }
              
        creatUser(email, password)
           
           .then(result =>{
            updateuserProfile(displayName, photoURL)
              .then(res=>{
                console.log(res.data)
              })
              .catch(error =>{
                console.log(error)
              })
             axiospublic.post('/user', register)
             .then(res=>{
              
              if(res.data.insertedId){

                setSuccess(toast("Wow Complite your Registion Successfully!"))
                navigate(forms)
           console.log('mama akta user paiya gase', result)
              }
             })
           })
           .catch(error =>{
            console.error(error.message)
            setError(error.message)
           })
      }
    return (

        <div>
        <div className=" min-h-screen bg-[#4be3ee]">
        <h2 className=" text-center text-2xl font-bold text-white underline uppercase italic py-7">Please Register Now</h2>
  <div className="  md:px-10  justify-center flex rounded">
                  
  <div className="hero-content flex-col gap-10   lg:flex-row-reverse">
    
    <div className="card shadow-2xl lg:w-1/2 w-full  bg-base-100">
      <form onSubmit={handelregister} className="card-body shadow-2xl rounded bg-[#34c8d3]">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text"  placeholder="Please Type Your Name" name="displayName" className="input input-bordered " required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered " required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className='relative cursor-pointer'> 
          <input type={showpassword? "text" : "password"} placeholder="password" name="password" className="input input-bordered  w-full" required />
          <span className='absolute text-right top-3 right-7' onClick={() => setShowpassword(!showpassword)}>
            {
              showpassword?<IoEye />:<FaEyeSlash /> 
            }
          </span>
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="url"  placeholder="Please Type Your Proto URL" name="photoURL" className="input input-bordered " required />
        </div>
        </div>
        <div>
          {
            success && <p className='text-green-800 hidden'>{success}</p>
          }
          {
            error && <p className='text-center font-bold  text-red-800'>{error}</p>
          }
        </div>
        <div className="form-control mt-6">
          <button className="btn shadow-md text-2xl text-white  font-bold shadow-[#1b191936] bg-gradient-to-r from-[#2363638e] to-[#3a84f3]">Register</button>
          <h2 className='text-center text text-3xl'>----------------------</h2>
          <span className='text-[#f1f8f8] font-bold text-xl text-center'>Already registered? Go to <Link className='text-red-800 text-2xl font-bold ml-2' to="/login">Login </Link></span>
        </div>
      </form>
    </div>
    <div className="">
      <img className=" rounded " src={imges} alt="" />
      
      
    </div>
   
  </div>
  <ToastContainer />
  </div>
</div>
        </div>
    );
};

export default Register;

