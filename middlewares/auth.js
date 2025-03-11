//auth for authentication, isStudent ,isAdmin for Authorization 

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
try{
//Extract JWT Token

const token=req.body.token || req.cookies.token;
if(!token){
    return res.status(401).json({
        success:false,
        message:'Token Missing',
    });
}

//Verify the Token

try{
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    console.log(payload);


    req.user=payload;

}

catch(error){
return res.ststus(401).json({
    success:false,
    message:'Token is Invalid',
});
}
next();
}

catch(error){
    return res.status(401).json({
        success:false,
        message:'Something went wrong,While verifying the token',
    });
}

}

exports.isStudent=(req,res,next)=>{

try{
if(req.user.role!=="Student"){
    return res.status(401).json({
        success:false,
        message:'This is a protected route for Student',
    });
}
next();


}

catch(error){
    return res.status(500).json({
        success:false,
        message:'User Role Not Matching ',
    });
}


}

exports.isAdmin=(req,res,next)=>{

    try{
    if(req.user.role!=="Admin"){
        return res.status(401).json({
            success:false,
            message:'This is a protected route for Admin',
        });
    }
    next();
    
    
    }
    
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Not Matching ',
        });
    }
    
    
    }
