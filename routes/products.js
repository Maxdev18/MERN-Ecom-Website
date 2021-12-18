const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

//Product Routes
router.get('/products/:id', productsController.getProductData);
router.get('/products', productsController.getProducts);

//Cart routes
router.get('/get-cart/:id', productsController.getCart);
router.post('/atc/:id', productsController.addToCartPost);

//Export Routes
module.exports = router;
