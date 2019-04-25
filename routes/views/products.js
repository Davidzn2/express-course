var express = require('express');
var router = express.Router();
// const products = require('../utils/mocks/products')

var ProductsService = require('../../services/products')

const ProductService = new ProductsService();


router.get('/', async function (req, res, next) {
  const { tags } = req.query;
  try{
    const products = await ProductService.getProducts({tags})
    res.render('products', { products });
  }catch(err){
    next(err)
  }
  
});

module.exports = router;
