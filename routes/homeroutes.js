//File includes routes and redirects for the homepage

//Require necessary modules
const express = require('express');
const router = express.Router();

// Home Controllers
const homeController = require('../controllers/home');

//Routes
router.get('/', homeController.home);

//Export Routes
module.exports = router;