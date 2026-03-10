import React, { use, useState } from 'react'
import signup from '../assets/signup.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate=useNavigate();
  const [user,setuser]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:""
  })
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setuser((prev)=>({...prev,[name]:value})
    )
  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log(user);
     try {
      const res=await axios.post('http://localhost:8000/api/v1/user/register',user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
       if (res.data.success) {
        toast.success("Sign-Up Successful!");  
        navigate('/login');
      } else {
        toast.error("Sign-Up failed");       
      }
     } catch (error) {
      console.log(error);
     }
    
  }
  return (
    <>
      <div className='flex justify-around items-center'>
        <div>
          <img src={signup} alt="signup-image" className='h-dvh hidden md:block' />
        </div>
        <div>
          <form onSubmit={handlesubmit}>
            <div className='bg-white flex flex-col'>
              <div className='text-center'><h1 className='text-2xl font-medium mt-5 md:mt-0'>Create an Account</h1></div>
              <div className='text-center'><h3>Enter your Details below to create your account</h3></div>
              <div className='flex flex-col md:flex-row gap-5 text-center md:text-start mt-5'>
                <label><h5 className='font-bold'>First Name</h5><input type="text" onChange={handlechange} name='firstname' placeholder='First Name' className='border w-[85vw] outline-none md:w-[15vw] p-2 border-black rounded-xl' /></label>
                <label><h5 className='font-bold'>Last Name</h5><input type="text"  onChange={handlechange} name='lastname' placeholder='Last Name' className='border w-[85vw] outline-none md:w-[15vw] p-2 border-black rounded-xl' /></label>
              </div>
              <div className='text-center md:text-start mt-5'>
                <label><h5 className='font-bold'>Email</h5><input type="text"  onChange={handlechange} name='email' placeholder='John.Doe@example.com' className='border w-[85vw] outline-none md:w-[31.5vw] p-2 border-black rounded-xl' /></label>
              </div>
              <div className='text-center md:text-start mt-5'>
                <label><h5 className='font-bold'>Password</h5><input type="password"  onChange={handlechange} name='password' placeholder='Create a Password' className='border w-[85vw] outline-none md:w-[31.5vw] p-2 border-black rounded-xl' /></label>
              </div>
              <div className='mt-5 text-center flex flex-col'>
                <button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 cursor-pointer to-pink-500 p-2 w-[85vw] rounded-xl text-white md:w-[31.5vw] font-medium'>Sign Up</button>
                <span className='mt-4'>Already have an account?  <Link className='text-blue-500' to="/Login">SIGN-IN</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup