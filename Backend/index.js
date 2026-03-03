const dotenv=require('dotenv');
dotenv.config()
const express=require('express');
const connectDB = require('./components/db');
const app=express();
const PORT=process.env.PORT || 3000
connectDB()
app.listen(3000,console.log(`server started on port ${PORT}`));
