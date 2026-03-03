import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home';
import Blogs from './Pages/Blogs';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navbar/><Home /></>} />
          <Route path="/blogs" element={<><Navbar/><Blogs /></>} />
          <Route path="/about" element={<><Navbar/><About /></>} />
          <Route path="/login" element={<><Navbar/><Login /></>} />
          <Route path="/signup" element={<><Navbar/><Signup /></>} />
        </Routes>
      </BrowserRouter>,
    </>
  )
}

export default App
