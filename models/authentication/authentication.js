const mongoose = require('mongoose');
const { Schema } = mongoose;

// Initialize Authentication Schema
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    cart_total: Number
});

const User = mongoose.model('User', userSchema);

// Export Schema
module.exports = User;