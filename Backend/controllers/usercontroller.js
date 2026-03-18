const User = require("../models/usermodel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const getdatauri = require("../utils/datauri");
const cloudinary=require('../utils/cloudinary')
//Controller
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be atleast 6 characters"
            })
        }
        const existinguserbyemail = await User.findOne({ email: email })
        if (existinguserbyemail) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        let user =await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const ispasswordvalid = await bcrypt.compare(password, user.password)
        if (!ispasswordvalid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            success:true,
            message:`Welcome back ${user.firstname}`,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}
const logout=async (_,res)=>{
    try {
        return res.status(200).cookie("token","",{httpOnly: true,
        sameSite: "strict",
        expires: new Date(0)}).json({
            success:true,
            message:"Logout Successful"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Logout was Unsuccessful"
        })
    }
}
const getme = async (req,res)=>{
  try {
    const token = req.cookies.token;

    if(!token){
      return res.json({success:false});
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    res.json({
      success:true,
      user
    });

  } catch {
    res.json({success:false});
  }
}
const updateprofile=async(req,res)=>{
    try {
        const userId=req.id
        const {firstname,lastname,facebook,instagram,linkedin,github,description}=req.body
        const file=req.file;
        const fileuri=getdatauri(file)
         const uploadResult = await cloudinary.uploader.upload(fileuri)
         const user=await User.findById(userId).select("-password")
         if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
            if(firstname) user.firstname=firstname
            if(lastname) user.lastname=lastname
            if(facebook) user.facebook=facebook
            if(instagram) user.instagram=instagram
            if(linkedin) user.linkedin=linkedin
            if(github) user.github=github
            if(bio) user.bio=bio
            if(file) user.photoUrl=uploadResult.secure_url

         }
    } catch (error) {
        console.logh(error)
    }
}
module.exports = {register,login,logout,getme}