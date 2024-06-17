const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://ponnadavijay:Eswar1728@cluster0.cs1xio4.mongodb.net/yandadagatedcommunity?retryWrites=true&w=majority&appName=Cluster0g';
        await mongoose.connect(uri);
        console.log('MongoDB connected...!');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connectDB;
