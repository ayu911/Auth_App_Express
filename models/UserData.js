//For making Model we need 2 things :->name of Model and schema for which we generally require the mongoose ODM

const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },

email:{
    type:String,
    required:true,
    trim:true,
},

password:{
    type:String,
    required:true,
},

//We now need the Permissions Role likke admin,student ,etc
role:{
    type:String,
    enum:["Admin","Student","Visitor"]//**Role will take any one of these 3 values**
}

})

model.exports=mongoose.model("UserData",userSchema);



