const Product = require('../models/product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new product' });
  }
};

//get product by id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};


// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// delete product by id
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product' });
  }
};

// Remove all products
const removeAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products have been removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove all products' });
  }
};

// Find all products which name contains 'kw'
const findProductsByName = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  removeAllProducts,
  findProductsByName,
  // Export other functions here
};
