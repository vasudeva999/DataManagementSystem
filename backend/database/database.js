const mongodb = require("mongoose");
require('dotenv').config();

const uri = process.env.connection_uri;

mongodb.connect(uri,{   
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongodb.connection.once("open", () => {
    console.log("Mongodb connection success...");
})

mongodb.connection.on("error", (error) => {
    console.log(error);
})

module.exports = mongodb