//File includes routes and redirects for the homepage

//Require necessary modules
const express = require('express');
const app = express();

//Routes
app.router('/', (req, res) => {
    res.render('../client/public/index');
})