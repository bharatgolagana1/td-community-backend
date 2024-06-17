const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userName: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:Number,
        default:0,
    }
});

module.exports = mongoose.model('user', user);