const express= require('express');
const router=express.Router();

const{login,signup}=require("../Controllers/Auth");
const{auth,isStudent,isAdmin}=require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signup);

//Protected Routes
//For Student

router.get("/student",auth,isStudent,(req,res)=>{ //Note that we haven't declared the controller here 
    res.json({
        success:true,
        message:'Welcome to the Protected Route for Students',
    });
});

//For Admin 
router.get("/admin",auth,isAdmin,(req,res)=>{//Note that we haven't declared the controller here 
    res.json({
        success:true,
        message:'Welcome to the Protected Route for Admin',
    });
});





moodule.exports=router;

