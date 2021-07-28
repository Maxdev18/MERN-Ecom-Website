// Command for git push request
// git push origin HEAD:master

// Initialize modules
const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('../routes/auth');

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views/'));

//Middleware
app.use(express.json()) ;
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));

//Listen for port
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if(err) console.log(err);
});

// Routes
app.use('/auth', authRoutes);