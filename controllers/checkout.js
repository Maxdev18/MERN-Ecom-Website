//import neccessary schemas
const Cart = require('../models/userCart/cart');

//Cart controllers
exports.updateQuantity = async (req, res) => {
  const quantity = req.body;
  const id = req.params.id;

  console.log(id);
  console.log(quantity);
}

//Checkout controllers
