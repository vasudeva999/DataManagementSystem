const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors());




app.use("/data", require('../server/server-routing'));

const PORT = 4000;

app.listen(PORT, () => {
    console.log('server is running.. on http://localhost:'+PORT);
})