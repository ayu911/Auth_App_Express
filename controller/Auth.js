const bcrypt=reqire("bcrypt");

//To interact with our database we have to import the models here as well

const User=require("../models/UserData");

const jwt=require("jsonwebtoken");



//Signup route Handler
exports.signup=async(req , res)=>{
    try{
//get Data
const{name,email,password,role}=req.body;
//Check if User already exists or not
const existingUser=await User.findOne({email});

//After checking if the Db syas the User Exists
if(existingUser){
    return res.ststus(400).json({
        success:false,
        message:'User already Exists',
    });
}

//If No user Exists then secure the Password
let hashedPassword;
try{
hashedPassword=await bcrypt.hash(password,10);//-->>10 is the no of rounds in where we have to hash the password
}
catch(err){
    return res.status(500).json({
        success:false,
        message:'Error in Hashing Password',
    });
}

    //Create Entry for User
const user=await User.create({
    name,email,password:hashedPassword,role,
})

return res.status(200).json({
    success:true,
    message:'User Created Successfully',
})


    }

    catch(error){
console.log(error);
return res.status(500).json({
    sucecss:false,
    message:'User cannot be registered,Please try again later',
})
    }
}

//login

exports.login=async(req,res)=>{
    try{
//Data fetch
const{email,password}=req.body;

//Validation on email and password
if(!email||!password){
    return res.ststus(400).json({
        success:false,
        message:'Please fill all the details carefully',
    });
}

//heck wheater the user is a Registered user or Not 

const user=await User.findOne({email});

//if not a registered User then
if(!user){
    return res.status(401).json({
        success:false,
        message:'User is not registered',
    });
}


const payload={
    email:user.email,
    id:user._id,
    role:user.role,
}

//verify password and Generate a JWT Token
if(await bcrypt.compare(password,user.password)){
//password match
let token=jwt.sign(payload,PermissionStatus.nv.JWT_SECRET,{
    expiresIn:"2h",
});
//Now send it in to User as in response
user.token=token;

//Protect the Pasword
user.password=undefined;

const options={
expires:new Data(Date.now()+3*24*60*60*1000),
httpOnly:true,

}

res.cookie("token",token,options).status(200).json({
    success:true,
    token,
    user,
    message:'User Logged in Successfully'
});

}
else{
    //password do not match
return res.ststus(403).json({
    success:false,
    message:"Password Incorrect"
})

}

    }
    catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:'Login Failure',
});
    }
}



