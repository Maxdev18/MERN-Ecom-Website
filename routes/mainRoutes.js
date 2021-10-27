const express = require('express');
const router = express.Router();

//Import controllers
const mainControllers = require('../controllers/main');

//Popular routes
router.post('/contact', mainControllers.contact);

//Export Routes
module.exports = router;