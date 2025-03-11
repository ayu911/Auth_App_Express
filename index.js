const express=require("express")
const app=express()

require('dotenv').config();
const PORT=process.env.PORT||4000;

//For parsing the Req
app.use(express.json());

//To Connect the DB

require("./config/database").connect();

//Route Import and mount 
const user=require("./routes/user");
app.use("/api/v1",user);

//Activate 

app.listen(PORT,()=>{
    console.log(`App is Running at ${PORT}`);
})




