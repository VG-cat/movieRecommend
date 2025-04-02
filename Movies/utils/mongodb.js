const mongoose = require('mongoose');

const connectDB = {};
var conn = false;

connectDB.connect = async () => {
    try {
        conn = await mongoose.connect('mongodb://127.0.0.1:27017/db1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('MongoDB Connection Error');
        console.log(error);
        process.exit(1);
    }
}

connectDB.close = () => {
    mongoose.connection.close();
}

exports.connectDB = connectDB

