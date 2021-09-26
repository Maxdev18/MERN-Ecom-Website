require('dotenv').config();

const mongoose = require('mongoose');
const productsData = require('../data/products');
const Product = require('../models/products/products');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MDB_CONNECT, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
            .then(console.log("Connected to MongoDB Successfully"))
            .catch(err => console.log(err))
    } catch(err) {
        console.error(err);
    }
}
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(productsData);

        console.log('Imported Data Successfully');
        process.exit();
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

importData();