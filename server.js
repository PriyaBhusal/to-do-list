var express = require('express')
var http = require('http')
require('dotenv').config()
var port = process.env.PORT
const app=express()
const router = require('./routes')
app.use("/",router)


var server=http.createServer(app);


server.listen(port,()=>{
   console.log("server is running in http://localhost:"+port);
})