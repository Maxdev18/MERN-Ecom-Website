//File includes routes and redirects for the homepage

//Require necessary modules
const express = require('express');
const router = express.Router();

// Home Controllers
const homeController = require('');

//Routes
router.get('/', (req, res) => {
    res.render('../client/views/home');
});

//Export Routes
module.exports = router;