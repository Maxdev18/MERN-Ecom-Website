const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

//Product Routes
router.get('/products/:id', productsController.getProductData);
router.get('/products', productsController.getProducts);

//Export Routes
module.exports = router;
