const express=require("express");
const MailController =require("../../Controllers/EmailControllers/MailController.js")
const router=express.Router();


// define routes for the send mail 
router.post("/sendmail",MailController.sendMail);

module.exports =router;