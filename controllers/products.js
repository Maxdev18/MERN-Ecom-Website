const Products = require('../models/products/products');

exports.postProductData = async (req, res, next) => {
  
};

exports.getProductData = async (req, res, next) => {
  let products = await Products.findById(req.params.id, (err, data) => {
    if(err){
        console.log(err);
    }
    else {
      console.log(data)
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