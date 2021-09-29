const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const user_schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

user_schema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(2);
        this.password = await bcrypt.hash(this.password, salt);
    }else{
        res.send("Failed to bcrypt the password");
    }
})

user_schema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}

user_schema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, 'key')
}

const User = mongoose.model("User", user_schema)

module.exports = User;