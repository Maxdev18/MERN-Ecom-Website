const Products = require('../models/products/products');

exports.getProductData = async (req, res, next) => {
  let products = await Products.find({}, (err, products) => {
    if(err){
        console.log(err);
    }
    else {
        res.send(products);
    }
  }
)};