const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.sourceMapsEnabled.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiiedTopology:true,
    })
    .then(()=>{console.log("DB Connected Successfully")})


    .catch((err)=>{
        console.log("DB Connection Issues");
        console.log(err);
        process.exit(1);
    });
}

