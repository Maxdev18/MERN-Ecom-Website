//import neccessary schemas
const Cart = require('../models/userCart/cart');

//Cart controllers
exports.updateQuantity = async (req, res) => {
  const { type, product } = req.body;
  const userId = req.params.id;

  const cart = await Cart.findById(userId)
    .then(data => {
      return data;
    });

  if(cart) {
    let itemIndex = cart.products.findIndex(p => p.product._id == product.product._id);
    let productItem = cart.products[itemIndex];
    switch(type) {
      case 'INCREMENT':
        productItem.quantity += 1;
        cart.products.set(itemIndex, productItem);
        break;
      case 'DECREMENT':
        if(productItem.quantity === 1) {
          cart.products.splice(itemIndex, 1);
        } else {
          productItem.quantity -= 1;
          cart.products.set(itemIndex, productItem);
        }
        break;
      case 'DELETE':
        cart.products.splice(itemIndex, 1);
        break;
    };
    
    await cart.save(err => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send(cart);
      }
    });
  }
}

//Checkout controllers
exports.checkoutTransaction = async (req, res) => {
  const userId = req.params.id;

  const cart = await Cart.findByIdAndDelete(userId);
  console.log(cart);
  res.status(200);
};