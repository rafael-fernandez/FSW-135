const express = require("express");
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt');


// Middleware (for every request) //
app.use(express.json());
app.use(morgan("dev"));




//Connection to Database
mongoose.connect('mongodb://localhost:27017/climate-action-101');

//Routes
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/User', require('./routes/userRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/comments', require('./routes/commentRouter.js'));

//Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

// Server Listen //
app.listen(9000, () => {
  console.log('This server is running on Port 9000')
})