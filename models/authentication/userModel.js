const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Initialize User Schema
const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

// userSchema.statics.findUser = async function (email, password) {
//     const user = await User.find({email, password});
//     if(user) {
//         return user;
//     } else {
//         return;
//     }
// }

// userSchema.pre('save', async function(next){
//     const user = this;
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

// Create Model
const User = mongoose.model('User', userSchema);

// Export Schema
module.exports = User;