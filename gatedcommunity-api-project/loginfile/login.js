require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const connectDB = require("../model/database.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const data = require("../loginfile/sample.js");
const user = require("../model/user.js");
const roomsInventory = require("../model/connect1.js");
const functionHallInventory = require("../model/connect.js")

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4040;

connectDB();

app.get("/users", (req, res) => {
  res.json(users);
});

const users = [];

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send('user create successfully');
  } catch (err) {
    console.log(err);
  }
});
 
app.post("/user/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("can not find user !");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Login Sucessful ... ");
    } else {
      res.send("not allowed...");
    }
  } catch (err) {
    console.log(err);
  }
});  

app.listen(PORT, () => {
  console.log("server started...!");
})

