const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../model/User")


const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        const{username,password} =req.body;
        if(!username || !password){
            return res.status(400).json({status:"failed",error:"username and password required"})
        }
        const user =await User.findOne({username})
        if(!user){
            return res.status(404).json({status:"failed",error:"user not found"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
        {
            return res.status(404).json({status:"failed",error:"Invalid Password"})
        }
        const token = jwt.sign({ userId:User._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ status: 'success', message: 'User registration successful', token });
    } catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
})

module.exports = router;