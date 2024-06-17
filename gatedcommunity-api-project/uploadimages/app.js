const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const ImageSchema = require('./image');
const DBconnect = require('./dbconnect');

const app = express();
var port = 5000;

app.use(bodyParser.json());

DBconnect();

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('testImage');


app.post("/uploadimage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("err");
    } else {
      const newImage = new ImageSchema({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => {
          console.log("Successfully Uploaded...");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});


app.listen(port, () => 
  console.log('server running...!'));