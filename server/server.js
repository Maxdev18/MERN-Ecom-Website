const express = require('express');
const app = express();
const router = express.Router();

//Listen for port
const PORT = process.env.PORT || 5000;

//View engine
app.set('view engine', 'ejs');

app.listen(PORT, err => {
    if(err) console.log(err);
})

//Routes
router.get('/', (req, res) => {
    res.render('../client/public/index');
})