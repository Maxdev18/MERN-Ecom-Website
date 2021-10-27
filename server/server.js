// Command for git push request
// git push origin HEAD:master

// Initialize modules
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('../routes/auth');
const homeRoutes = require('../routes/homeroutes');
const productRoutes = require('../routes/products');
const mainRoutes = require('../routes/mainRoutes');
const reviewRoutes = require('../routes/reviews');

dotenv.config();

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views/'));

//Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use(express.json()) ;
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/auth', authRoutes);
    app.use('/', homeRoutes);
    app.use('', mainRoutes);
    app.use('/api', productRoutes);
    app.use('/api/reviews', reviewRoutes);

    app.get('/h', (req, res) => {
        res.send('Hello There')
    });

// Connect to mongoDB and Listen for port
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MDB_CONNECT, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
            .then((result)=> app.listen(PORT))
            .then(console.log("Connected to MongoDB Successfully"))
            .catch(err => console.log(err))
    } catch(err) {
        console.error(err);
    }
}
connectDB();