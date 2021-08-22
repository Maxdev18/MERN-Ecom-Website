const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Initialize User Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Generate hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

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
const User = mongoose.model('User', UserSchema);

// Export Schema
module.exports = User;