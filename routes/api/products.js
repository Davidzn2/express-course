var express = require('express');
var router = express.Router();

var ProductsService = require('../../services/products')

const ProductService = new ProductsService();

router.get('/', async function(req, res, next) {
  const { query:tags } = req.query;
  try{
    const products = await ProductService.getProducts({ tags: tags  })
    res.status(200).json({
      data: products,
      message: 'products listed'
  });
  }catch(err){
    next(err)
  };
});
router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try{
      const product = await ProductService.getProduct({ productId: productId  })
      res.status(200).json({
          data: product,
          message: 'products retrieved'
      });
    }catch(err){
      next(err)
    };
  });
router.post('/', async function(req, res, next) {
  const { body: product } = req;
  try{
    const createdProduct = await ProductService.createProduct({ product })
    res.status(201).json({
        data: createdProduct,
        message: 'products created'
    });
  }catch(err){
    next(err)
  }
  });
  router.put('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body:producto } = req;
    try{
      const product = await ProductService.updateProduct({ productId, producto  })
      res.status(200).json({
          data: product,
          message: 'products updated'
      });
    }catch(err){
      next(err)
    };  
  });
  router.delete('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try{
    const product = await ProductService.deleteProduct({ productId: productId  })
    res.status(200).json({
        data: product,
        message: 'products deleted'
    });
    }catch(err){
      next(err)
    };
  });

module.exports = router;
