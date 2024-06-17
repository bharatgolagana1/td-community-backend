require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const user = require('./model/user.js');
const connectDB = require("./model/database.js");
const roomsInventory = require("./model/connect1.js");
const functionHallInventory = require("./model/connect.js");

app.use(express.json());
app.use(bodyParser.json());

console.log(process.env.URL);
console.log(process.env.PORT);

connectDB();

const PORT = process.env.PORT || 4040;

app.get('/users', async (req, res) => {
  try {
      const allData = await user.find();
      res.json(allData);
  }
  catch(err){
      console.error(err.message);
      res.status(200).send('Server error');
  }
});

app.post('/createUser', async (req, res) => {
const { userName, password } = req.body;
try {
  const newUser = new user({ userName, password });
  await newUser.save();
  const allUsers = await user.find();
  return res.json(allUsers);
} catch (err) {
  console.log(err.message);
}
console.log('user create sucessfully..!')
});

app.put('/updateUser/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const updatedUser = await user.findByIdAndUpdate(id, req.body);
      if (!updatedUser) {
        return res.status(404).send({ message: "user not find"});
      }
      const userupdate = await user.findById(id);
      res.status(200).json(userupdate)
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "error message" });
    }
    console.log('user data update sucessfully..!');
  });

app.delete('/deleteUser/:id', async (req, res) =>{
try {
  await user.findByIdAndDelete(req.params.id);
  return res.json(await user.findById());
  } catch (err) {
  console.log(err);
 }
 console.log('user delete sucessfully..!')
});

//room interface

app.get("/allrooms", async (req, res) => {
  try {
    const allRooms = await roomsInventory.find();
    return res.json(allRooms);
  } catch (err) {
    console.error(err.message);
  }
});

//room status filter

app.get("/allrooms/check", async (req, res) => {
  try {
    const allRooms = await roomsInventory.find(req.query);
    return res.json(allRooms);  
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/addRoom", async (req, res) => {
  const {
    TenantId,
    RoomType,
    BedType,
    Address,
    Date,
    Status,
    Adults,
    Childrens,
    Price,
    MobileNumber,
    Email,
    Rating,
    Timings
  } = req.body;
  try {
    const newRoom = new roomsInventory({
      TenantId,
      RoomType,
      BedType,
      Address,
      Date,
      Status,
      Adults,
      Childrens,
      Price,
      MobileNumber,
      Email,
      Rating,    
      Timings
    });
    await newRoom.save();
    console.log('data added')
    return res.send(await roomsInventory.find());
  } catch (err) {
    console.log(err);
  };
  console.log("rooms details added...!");
});

app.put("/updateRoom/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const roomUpdate = await roomsInventory.findByIdAndUpdate(id, req.body);
    console.log("updatedroom");
    if (!roomUpdate) {
    return res.status(404).json({ Message: "room not find" });
    }
    const updateRoom = await roomsInventory.findById(id);
    res.status(200).json(updateRoom);
     } catch (err) {
     console.log(err);
     res.status(400).json({ message: "error message" });
    }
  console.log('rooms detais updated successfully');
});

app.delete("/deleteRoom/:id", async (req, res) => {
  try {
    await roomsInventory.findByIdAndDelete(req.params.id);
    console.log('data deleted')
    return res.json(await roomsInventory.findById());
  } catch (err) {
    console.log(err.message);
  }
  console.log("room details deleted...!");
});


app.get("/functionHall", async (req, res) => {
  try {
    const allData = await functionHallInventory.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/functionType/:id", async (req, res) => {
  try {
    const functionHall = await functionHallInventory.findById(req.params.id);
    return res.json(functionHall);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/functionType/check", async (req, res) => {
  try {
    const functionHall = await functionHallInventory.findById(req.query);
    return res.json(functionHall);
  } catch (err) {
    console.log(err.message);
  }
  console.log("data filtered");
});

app.post("/addFunctionHall", async (req, res) => {
  const {
    TenantId,
    FunctionHallName,
    DiningHalls,
    FunctionType,
    Date,
    Price,
    Address,
    Status,
    Capacity,
    MobileNumber,
    Email,
    Rating,
    Timings
  } = req.body;
  try {
    const newFunctionHall = new functionHallInventory({
    TenantId,
    FunctionHallName,
    DiningHalls,
    FunctionType,
    Date,
    Price,
    Address,
    Status,
    Capacity,
    MobileNumber,
    Email,
    Rating,
    Timings
    });
    await newFunctionHall.save();
    console.log("Function hall details added...!");
    return res.status(201).json(newFunctionHall);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateFunctionHall/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const functionHallUpdate = await functionHallInventory.findByIdAndUpdate(id, req.body);
  console.log('data updated')
  if (!functionHallUpdate) {
  return res.status(404).json({ Message: "room not find" });
  }
  const updateFunctionHall = await functionHallInventory.findById(id);
  res.status(200).json(updateFunctionHall);
   } catch (err) {
   console.log(err);
   res.status(400).json({ message: "error message" });
  }
  console.log("functionhall details updated...!");
});


app.delete("/deleteFunctionHall/:id", async (req, res) => {
  try {
    await functionHallInventory.findByIdAndDelete(req.params.id);
    console.log('data deleted')
    return res.json(await functionHallInventory.findById());
  } catch (err) {
    console.log(err.message);
  }
  console.log("functionhall details deleted...!");
});

app.listen(PORT, () => console.log("server is running...!"));
