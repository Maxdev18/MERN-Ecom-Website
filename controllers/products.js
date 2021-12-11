const Products = require('../models/products/products');
const Cart = require('../models/userCart/cart');
const User = require('../models/authentication/userModel');

exports.getProductData = async (req, res) => {
  let products = await Products.findById(req.params.id, (err, data) => {
    if(err){
        console.log(err);
    }
    else {
      res.send(data);
    }
  });

  return products;
};

exports.getProducts = async (req, res) => {
  let products = await Products.find({})
    .then(data => {
      return data;
    });
    
  res.body = products;
  res.send(res.body);
};

exports.addToCartPost = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body._id;

  const cart = await Cart.findById(userId)
    .then(data => {
      return data;
    });

  const product = await Products.findById(id)
    .then(data => {
      return data;
    });

  if(cart) {
    let itemIndex = cart.products.findIndex(p => p.product._id == id);
    
    if(itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity += 1;  
      cart.products.set(itemIndex, productItem);
    } else {
      cart.products.push({ product, quantity: 1 });
    }
    console.log(cart);
    await cart.save(err => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send(cart);
      }
    });
  } else {
    const item = { product, quantity: 1 };
    const newCart = new Cart({
      _id: userId,
      products: item
    });

    await newCart.save(err => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send(newCart);
      }
    })
  }
};