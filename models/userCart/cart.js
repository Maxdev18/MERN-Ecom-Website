const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: []
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;