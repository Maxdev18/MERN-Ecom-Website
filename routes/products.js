const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

//Product Routes
router.get('/products', products.getProductData);

//Export Routes
module.exports = router;
