const Product = require('../models/products/products');
const Cart = require('../models/userCart/cart');

exports.getProductData = async (req, res) => {
  let products = await Product.findById(req.params.id, (err, data) => {
    if(err){
        console.log(err);
    }
    else {
      res.status(200).send(data);
    }
  });

  return products;
};

exports.getProducts = async (req, res) => {
  const searchQuery = req.query.search ? req.query.search : false;
  console.log(searchQuery)
  // Scalable pagination
  if(searchQuery) {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    let products;
    if(page == 1) {
      products = await Product.find();
    } else {
      products = await Product.find().limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));
    }
    
    const filteredResults = products.filter(item => {
      const splitQuery = searchQuery.toLowerCase().split(' ');
      for(let i = 0; i <= splitQuery.length; i++) {
        return item.name.toLowerCase().includes(splitQuery[i]) || item.description.toLowerCase().includes(splitQuery[i + 1]) ? item : null;
      }
    });
    
    res.status(200).json({
      totalPages: Math.ceil(filteredResults.length / PAGE_SIZE),
      filteredResults
    });
  } else {
    let products = await Product.find({})
    .then(data => {
      console.log(data);
      return data;
    });
    
    res.body = products;
    res.status(200).send(res.body);
  }
};

exports.addToCartPost = async (req, res) => {
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

exports.getCart = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  let cart = await Cart.findById(userId, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      return data;
    }
  });

  res.body = cart;
  res.status(200).json(res.body);
}