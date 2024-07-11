const express = require('express');
const cors = require('cors'); // Import cors package
const sequelize = require('./config/db');
const Product = require('./models/product');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());
app.use(express.json());

// for Testing the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Add product endpoint
app.post('/add-product', async (req, res) => {
  const { name, category, brand, price, description, photos } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      category,
      brand,
      price,
      description,
      photos,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Fetch all products endpoint
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update product endpoint
app.put('/products/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, brand, price, description, photos } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name;
      product.category = category;
      product.brand = brand;
      product.price = price;
      product.description = description;
      product.photos = photos;

      await product.save();
      res.status(200).json({ message: 'Product updated successfully', product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
