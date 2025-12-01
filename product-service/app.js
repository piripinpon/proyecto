const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongo-products:27017/products_db')
  .then(() => console.log("MongoDB Products conectado"))
  .catch(err => console.log(err));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

app.get('/products', async (req, res) => {
  res.json(await Product.find());
});

app.post('/products', async (req, res) => {
  res.json(await Product.create(req.body));
});

app.listen(3002, () => console.log("Product Service en 3002"));

