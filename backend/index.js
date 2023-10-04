const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importing database configuration and models
require('./db/config');
const User = require("./db/User");

// Register route
app.post("/register", async (req, resp) => {
 
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  console.log(result);
  resp.send(result);
})
app.post("/login", async (req, resp) => {
  console.log(req.body)
  if (req.body.password && req.body.email) 
  {
    let user= await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user)
    }else {
      resp.send({result: 'No User Found' })
      }
    }else {
      resp.send({ result: 'No User Found' })
      }
  })
// Start the server
app.listen(3000);
