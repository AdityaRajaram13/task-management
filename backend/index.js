const express = require("express")
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const connectDB = require("./db")
PORT = 4000
 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`connected http://localhost:${PORT}`);
    })
})
.catch(err => {
    console.error("error connecting to database",err);
});


const signup = require("./routes/signup");
const login = require("./routes/login")

app.get("/",(req,res)=>{
    res.json({message:"Api is Running"})
})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/signup",signup);
app.use("/api/login",login);
app.use((err,req,res,next)=>{
console.error(err);
res.status(500).json({error:"Internal server error"});
})

// app.listen(PORT,()=>{
//     console.log(`Api is Running on ${PORT}`)
// })
