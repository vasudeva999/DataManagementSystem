const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const admin_schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

admin_schema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(2);
        this.password = await bcrypt.hash(this.password, salt);
    }else{
        res.send({message:"Failed to bcrypt the password", status: ""});
    }
})

user_schema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", user_schema)

module.exports = User;