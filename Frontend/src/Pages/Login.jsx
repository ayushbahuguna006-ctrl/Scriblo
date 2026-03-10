import React from 'react'
import signup from '../assets/signup.jpg'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate=useNavigate();
  const [user,inputuser]=useState({
    email:"",
    password:""
  })
  const handlechange=(e)=>{
    const {name,value}=e.target;
    inputuser((prev)=>({...prev,[name]:value})
    )
  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log(user);
     try {
      const res=await axios.post('http://localhost:8000/api/v1/user/login',user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
       if (res.data.success) {
        console.log(res.data.user);
        toast.success(`Welcome Back ${res.data.user.firstname} `); 
        setTimeout(() => {
        window.location.href = "/";;
      }, 1000); 
      } else {
        toast.error("Login failed");       
      }
     } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
     }
    
  }
  return (
    <>
      <div className='flex justify-center items-center'>
        <div>
          <img src={signup} alt="signup-image" className='h-dvh hidden md:block' />
        </div>
        <div>
          <form onSubmit={handlesubmit}>
            <div className='bg-white flex flex-col'>
              <div className='text-center'><h1 className='text-2xl font-medium mt-[20vh] md:mt-0'>Login into your Account</h1></div>
              <div className='text-center'><h3>Enter your Details below to login your account</h3></div>
              <div className='text-center md:text-start mt-5'>
                <label><h5 className='font-bold'>Email</h5><input  name="email" type="text" onChange={handlechange} placeholder='Email Address' className='border w-[85vw] outline-none md:w-[31.5vw] p-2 border-black rounded-xl' /></label>
              </div>
              <div className='text-center md:text-start mt-5'>
                <label><h5 className='font-bold'>Password</h5><input name='password' onChange={handlechange} type="password" placeholder='Enter your Password' className='border w-[85vw] outline-none md:w-[31.5vw] p-2 border-black rounded-xl' /></label>
              </div>
              <div className='mt-5 text-center flex flex-col'>
                <button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 cursor-pointer to-pink-500 p-2 w-[85vw] rounded-xl text-white md:w-[30vw] font-medium'>Login</button>
                <span className='mt-4'>Already have an account?  <Link className='text-blue-500' to="/">SIGN-UP</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login