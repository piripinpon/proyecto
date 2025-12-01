const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongo-orders:27017/orders_db')
  .then(() => console.log("MongoDB Orders conectado"))
  .catch(err => console.log(err));

const Order = mongoose.model('Order', new mongoose.Schema({
  productId: String,
  userId: String,
  quantity: Number
}));

app.get('/orders', async (req, res) => {
  res.json(await Order.find());
});

app.post('/orders', async (req, res) => {
  res.json(await Order.create(req.body));
});

app.listen(3003, () => console.log("Order Service en 3003"));
