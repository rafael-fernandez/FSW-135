const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = 5500

//MiddleWare
app.use(express.json());
app.use(morgan("dev"));


//Connection to Database
main().catch(err => console.log(err));
  async function main() {
      await mongoose.connect('mongodb://localhost:27017/inventoryDB');  
  }
  

//Routes
app.use('./inventory', require('./routes/inventoryRouter.js'));


//Error Handler
app.use((err, req, res,) => {
    console.log(err);
    return res.send({errMsg: err.message})
});

//Server Listen
app.listen(PORT, () => {
    console.log(`You have connected successfully to the database on port: ${PORT}`);
});