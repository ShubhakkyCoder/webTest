const express = require('express');

const cookieParser = require("cookie-parser");
const SendMailRouting=require("./routes/EmailRoutes/EmailRouting.js")

// set the cors policy
var cors=require("cors");
// create the express app 
var app = express();
// set the cors policy for comunication between react and node.js
app.use(cors({credentials:true}))
// body parser 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

// set Routing Path
app.use('/shubh',SendMailRouting);



// listening the paritcular port number
var port=process.env.PORT||8080;
app.listen(port,()=>{
  console.log('app is running')
})
