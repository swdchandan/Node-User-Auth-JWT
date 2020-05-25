require('dotenv').config();
const express = require('express');
const app = express();
const customerRouter = require('./api/customers/user.router');

app.use(express.json());
app.use("/api/customer", customerRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running : ",process.env.APP_PORT);
})