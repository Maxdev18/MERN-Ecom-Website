//File includes routes and redirects for the homepage
const verifyJWT = require('../middleware/authentication/authentication');

//Require necessary modules
const express = require('express');
const router = express.Router();

// Home Controllers
const homeController = require('../controllers/home');

//Routes
router.get('/', verifyJWT, homeController.home);

//Export Routes
module.exports = router;