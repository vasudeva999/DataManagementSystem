const { response } = require('express');
const express = require('express');
const User = require("../models/user");
require('../database/database')
const jwt = require('jsonwebtoken')

const router = express.Router();


router.get("/getAllUsers", async (req, res)=>{

    try{
        res.send(await User.find())
    }catch(error){
        console.log(error.message);
        res.send(error)
    }

})

router.post("/authenticate", async (req, res)=>{
    const {email, password} = req.body
    try{
        
        const user = await User.findOne({email: email});
        if (user){
            const isMatch = await user.comparePasswords(password);
            if (isMatch){ 
                const token = jwt.sign({id: user._id}, 'key')
                res.send({success: true, message: 'User Exists', status: 'Valid User', token: token})
            }else {
                res.send({success: false, message: 'Invalid Password!\nRe-enter your password.', status: 'Incorrect Password', token: null})
            }

        }else{
            res.send({success: false, message : 'User with email Id '+ email+' is not registered!', status: "Invalid User", token: null})
        }

    }catch(error){
        res.send(error.message)
    }
})


router.post("/addUser", async (req, res)=>{
    const {name, email , password} = req.body;

    try{
        const user = await User.create({
            name: name, 
            email: email,
            password: password
        });
        res.send({message:"User added successfully..", token: user.getSignedToken()});
    }catch(error){
        res.send({message: error.message, token: null});
    }
})

router.delete("/dropUser/:email", async (req, res)=>{
    try{
        await User.deleteOne({email:req.params.email})
        
        
        res.send("User drop-out from database.")
    }catch(error){
        res.send({message: error.message})
    }
})

router.post("/updateUser/:email", async (req, res)=>{
    const {name, email, password} = req.body

    try{
        await User.updateOne({email: req.params.email},{
            name: name,
            email: email,
            password: password
        });
        res.send("User Updated!")
    }catch(error){
        res.send(error.message);
    }
})

router.get("/isUserExists/:email", async (req, res)=>{
    try{
        res.send(await User.findOne({email: req.params.email})?true:false)
    }catch(error){
        console.log(error.message);
    }
    
})


router.get("**", (req, res)=>{
    res.send("Sorry your are trying to accessing the unknown path :(")
})


module.exports = router