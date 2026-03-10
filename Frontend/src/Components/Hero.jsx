import React from 'react'
import blog_img from "../assets/blog_img.webp"
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
      <div className='flex justify-around items-center flex-wrap'>
        <div className='flex flex-col md:gap-6 gap-3 font-bold ml-2 md:text-5xl text-3xl flex-wrap'>
          <div className='mt-3 '> <h1>EXPLORE THE LATEST TECH</h1>
            <h1 className='hidden md:block'>& WEB TRENDS</h1>
          </div>
          <div className='text-xl font-medium text-stone-500'>
            <h1>Stay ahead with in-depth articles,tutorials and insights on web</h1>
            <h1>development,digital marketing and tech innovations</h1>
          </div>
          <div className='flex gap-2 md:gap-4 justify-start md:justify-start'>
            <Link className='bg-black text-white text-sm p-2 rounded-xl hover:bg-stone-300 hover:text-black transition-all ease-in cursor-pointer border border-white'>GET STARTED</Link>
            <Link className='bg-black text-white rounded-xl p-2 text-sm cursor-pointer hover:text-black hover:bg-gray-300 border border-white'>LEARN MORE</Link>
          </div>
        </div>
        <div className='mt-5 mx-2'><img src={blog_img} alt="blog_img" className='rounded-xl' /></div>
      </div>
    </>
  )
}

export default Hero