const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const User = require("./models/user");

const app = express();

const uri = process.env.connection_uri;


mongoose.connect(uri,{   
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.once("open", () => {
    console.log("Mongodb connection success...");
})

mongoose.connection.on("error", (error) => {
    console.log(error);
})

app.use(express.json())
app.use(cors());

app.get("/displayUsers", (req, res)=>{

    User.find((error, result)=>{
        try{
            if (error){
                console.log(error.message);
            }else{
                res.send(result);
            }
        }catch(error){
            console.log(error.message);
        }

    })

})

app.post("/addUser", async (req, res)=>{
    const {name, email , password} = req.body;

    try{
        const user = await User.create({
            name: name, 
            email: email,
            password: password
        });

        // const user_data = await User.findOne({
        //     email : email
        // });

        // console.log(user_data);
        // console.log(user);

        res.send("User added successfully..");
    }catch(error){
        res.send({message: error.message});
    }
})


const PORT = 4000;

app.listen(PORT, () => {
    console.log('server is running.. on http://localhost:'+PORT);
})