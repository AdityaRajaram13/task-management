const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../model/User")

const router = express.Router();

router.post("/", async(req,res)=>{
    const{ username, password} =req.body;
    if(!username || !password){
        return res.status(400).json({status:"failed",error:"username and password are required"})
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ status: 'success', message: 'User registration successful', token });
    } catch (error) {
        console.error("Error creating user", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;