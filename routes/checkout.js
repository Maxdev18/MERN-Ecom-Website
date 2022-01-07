const express = require('express');
const router = express.Router();

//Import controllers
const checkoutControllers = require('../controllers/checkout');

//Routes for checkout and cart
router.post('/user/:id', checkoutControllers.updateQuantity);

module.exports = router;