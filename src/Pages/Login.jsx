/* eslint-disable react/no-unescaped-entities */
 

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import imgs from '../assets/Computer login.gif'
import UseAuth from '../UseHook/UseAuth';
const Login = () => {
    const [success, setSuccess] = useState('')
    const [error, setError]= useState('')
    const{signIn} = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const forms = location.state || '/'
    const{googleLogin} = UseAuth()
    // const [showpassword, setShowpassword] = useState(false)
    const googleLogins = event =>{
      event()
      // console.log(githubLogin)
      // setSuccess('')
      // setError('')
        //  console.log(googleLogin)
      .then(result =>{
         console.log(result)
         navigate(forms)
       })
       .catch(error =>
        // console.error(error)
        error(error.message)
    )
    }
    const handelLogin = event => {
        event.preventDefault()
        setError('')
        setSuccess('')
        const form = event.target;
    
        const email = form.email.value;
        const password = form.password.value;
        const register = { email, password }
        console.log(register)
        // -----------login---------------
        signIn(email, password)
          .then(result => {
            setSuccess(toast("Login a user Successfully"))
            console.log('login a user',result)
            navigate(forms)
          })
          .catch(error=>{
            setError(error.message)
          })
        // const [showpassowrd, setpassword] = useState(false)
      }
      const [showpassowrd, setpassword] = useState(false)
    return (
        <div>
           <div>
      <div className="min-h-screen  bg-[#F0F2F5] ">
        <div className="  md:p-10 flex justify-center  bg-[#40dbe07c] rounded">
         
          <div className="hero-content flex-col  gap-10  lg:flex-row-reverse">

            <div className="card shadow-2xl  lg:w-96 w-full  bg-base-100">
            
              <div className='rounded-t-lg bg-gradient-to-r from-[#42ec67] to-[#f113d4] ' >
                <h2 className='text-2xl rounded-t-lg font-extrabold italic text-center py-5 text-white '>Login form</h2>
              </div>
              <form onSubmit={handelLogin} className="card-body bg-[#42e2daad] pb-0">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
 
                <div className="form-control">
                 <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className='relative cursor-pointer'>
                    <input type={showpassowrd ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full " required />
                    <span onClick={() => setpassword(!showpassowrd)} className='absolute text-right top-3 right-7'>
                      {
                        showpassowrd ? <IoEye /> : <FaEyeSlash />
                      }
                    </span>
                  </div>

                </div>
                  <div>
                    {
                      error && <p className='text-red-900 text-center font-bold text-base'>{error}</p>
                    }
                    {
                      success && <p className='hidden'> {success}</p>
                    }
                  </div>
                <div className="form-control mt-6">
                  <button className="btn text-2xl text-white  font-bold bg-gradient-to-r from-[#46db4d] to-[#F3429C]">Login</button>

                </div>
              </form>
              <div className='bg-[#42e2daad]'>
                <h2 className=' text-2xl font-bold text-center bg-gradient-to-r from-[#af445b] to-[#0dbde9] text-transparent bg-clip-text '>----- or-----</h2>
                <div className='flex justify-center gap-5 items-center py-3 '>
                  <button onClick={()=> googleLogins(googleLogin)} className='text-5xl' ><FcGoogle /> </button>
                
                </div>
                <div>
                 
                </div>
              </div>

              <span className='font-bold text-base  rounded-b-lg italic text-center py-2 text-white bg-gradient-to-r from-[#AF44AE] to-[#5cd42c]'>New here? Create a New Account <Link className='text-[#4eece4] text-lg font-bold ml-2' to="/login">Register </Link></span>
            </div>
            <div className="lg:w-[500px]">
              <img className=" bg-black  rounded " src={imgs} alt="" />


            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
        </div>
    );
};

export default Login;