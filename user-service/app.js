const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// ---- CONEXIÓN A MONGO ----
mongoose.connect('mongodb://mongo-users:27017/users_db')
  .then(() => console.log("MongoDB Users conectado"))
  .catch(err => console.log(err));

// ---- MODELO ----
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));

// ---- ENDPOINTS ----

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.listen(3001, () => console.log("User Service en 3001"));

