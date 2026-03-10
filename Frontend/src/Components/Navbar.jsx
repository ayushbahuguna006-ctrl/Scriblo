import React from 'react'
import { useState } from 'react';
import { FaFeatherAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import profile from "../assets/profile.webp"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = true;
  const handlesubmit=async()=>{
     try {
      const res=await axios.get('http://localhost:8000/api/v1/user/logout',{},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      console.log(res.data);
       if (res.data.success) {
        toast.success("Logout Successful!");
        navigate('/');
      } else {
        toast.error("Logout failed");       
      }
     } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
     }
  }
  return (
    <>
      <div className='flex items-center justify-between   md:justify-around bg-white h-[10vh]'>
        <div>
          <div className='ml-1'><FaFeatherAlt size={30} className='text-black'/></div>
        </div>
        <div className='hidden md:flex rounded-xl  border border-black'>
          <div>
            <input type="text" placeholder='Search' className='pl-5 border-l-5 outline-none w-[50vh] border-black rounded-l-md  p-1' />
          </div>
          <div>
            <FaSearch size={34} className='bg-black w-10 p-2 text-white rounded-xl' />
          </div>
        </div>
        <div className='flex justify-end ml-5'>
          <Link to="/" className=' text-black  rounded-sm py-2 px-2.5 font-semibold hover:text-gray-500  hover:bg-white hover:text-black transition-all ease-in'>Home</Link>
          <Link to="/blogs" className='text-black  rounded-sm py-2 px-2.5 font-semibold hover:text-gray-500  hover:bg-white   transition-all ease-in'>Blogs</Link>
          <Link to="/about" className='text-black  rounded-sm py-2 px-2.5  font-semibold hover:text-gray-500  hover:bg-white  transition-all ease-in'>About</Link>
        </div>
        {user ? (<div className='items-center justify-end gap-10 flex'><img src={profile} className='h-10 ml-5 border border-black  rounded-4xl' alt="profile-image" /><div><button  className='md:text-white hidden md:block text-black bg-stone-200 border-black text-base rounded-sm md:py-0.5   px-2 h-20px md:px-2 md:bg-black font-bold  hover:bg-white hover:text-black  transition-all ease-in' onClick={handlesubmit}>Logout</button></div></div>) : (<div className='flex gap-2 md:gap-6 justify-between items-center mt-1'>
          <Link to="/login" className='text-white text-base  border-black rounded-sm md:py-0.5  py-1  px-2 h-20px md:px-2.5 bg-black font-bold hover:bg-white hover:text-black  transition-all ease-in mr-2'>Login</Link>
          <Link to="/signup" className='md:text-white hidden md:block text-black bg-stone-200 border-black text-base rounded-sm md:py-0.5   px-2 h-20px md:px-2 md:bg-black font-bold  hover:bg-white hover:text-black  transition-all ease-in'>Signup</Link>
        </div>)}
      </div>
      <hr />
    </>
  )
}

export default Navbar