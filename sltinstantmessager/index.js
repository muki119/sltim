//main manager 
const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require("cors")
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const mong = require('mongoose');//database connection (use environments)
const dot =require('dotenv').config();
const { Schema } = mong;

const registerops = require('./regiops/register.js');//register middleware 
const loginops = require('./loginops/login.js');//login middleware 
const messops = require('./message_handle/messproc.js') // message handling middleware


app.use(cookieParser())
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//starts server---
app.listen(process.env.PORT,(err)=>{if(!err){console.log('listening on port :'+process.env.PORT)}else{console.log(err)}})
app.use(cors({origin:'http://localhost:8080',credentials:true}))
app.use(helmet()) // response headers removal
app.use((req,res,next)=>{
  res.set('Server','H26') // H26 server moniker
  next()
})
//----
//----- login --------


app.use(registerops);//calls register middleware 
app.use(loginops); // login operations
app.use(messops); // message handling


//------------------------
//connects to database 
var url = process.env.DATABASE_CONURL
const usrdb = mong.connect("mongodb+srv://muki11:kimera11@cluster0.tew2a.mongodb.net/cluster0?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true},(err)=>{
    if (err){
        console.log('maindb connection error')
        console.log(err)
    }else{
      console.log('Successfull main db connection')  
    }
})

//schema to send to 

module.exports = usrdb;
module.exports = app;
