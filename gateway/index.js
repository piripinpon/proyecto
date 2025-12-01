const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Rutas que redirigen a los microservicios
// -----------------------------------------

// USERS
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/users');
        res.json(response.data);
    } catch (error) {
        console.error('Error en USERS:', error.message);
        res.status(500).json({ error: 'Users service no responde' });
    }
});

// PRODUCTS
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('http://product-service:3002/products');
        res.json(response.data);
    } catch (error) {
        console.error('Error en PRODUCTS:', error.message);
        res.status(500).json({ error: 'Product service no responde' });
    }
});

// ORDERS
app.get('/orders', async (req, res) => {
    try {
        const response = await axios.get('http://order-service:3003/orders');
        res.json(response.data);
    } catch (error) {
        console.error('Error en ORDERS:', error.message);
        res.status(500).json({ error: 'Order service no responde' });
    }
});

app.get('/', (req, res) => {
    res.send('API Gateway funcionando');
});

app.listen(3000, () => {
    console.log('API Gateway en puerto 3000');
});

