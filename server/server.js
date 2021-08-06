// Command for git push request
// git push origin HEAD:master

// Initialize modules
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('../routes/auth');
const homeRoutes = require('../routes/homeroutes');

dotenv.config();

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views/'));

//Middleware
app.use(express.json()) ;
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));

//Listen for port
const PORT = process.env.PORT || 5000;

// Routes
app.use('/auth', authRoutes);
app.use('/', homeRoutes);

// Connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then((result)=> app.listen(PORT))
    .catch(err => console.log(err))