const User=require("../models/usermodel")
const bcrypt = require('bcrypt');

const register=async(req,res)=>{
    try {
        const{firstname,lastname,email,password}=req.body;
        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!emailRegex.test(email)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid email"
                })
            }
            if(password.length<6){
                return res.status(400).json({
                    success:false,
                    message:"password must be atleast 6 characters"
                })
            }
            const existinguserbyemail=await User.findOne({email:email})
            if(existinguserbyemail){
                return res.status(400).json({
                    success:false,
                    message:'Email already exists'
                })
            }
                const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                firstname,
                lastname,
                email,
                password:hashedPassword  })
            return res.status(201).json({
                success:true,
                message:"Account created successfully"
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}
module.exports=register