const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors());

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Marketplace application' });
});


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Marketplace', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your routes and API endpoints here

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const productController = require('./controllers/productController');

// Create a new product
app.post('/products', productController.createProduct);

// Get all products
app.get('/products', productController.getAllProducts);
