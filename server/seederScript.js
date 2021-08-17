require('dotenv').config();

const productsData = require('../data/products');
const Product = require('../models/products/products');
const connectDB = require('../config/db');

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