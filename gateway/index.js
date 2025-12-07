const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// USERS ----------------------------------------

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('http://user-service:3001/users');
        res.json(response.data);
    } catch (error) {
        console.error('Error en USERS GET:', error.message);
        res.status(500).json({ error: 'Users service no responde' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const response = await axios.post('http://user-service:3001/users', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error en USERS POST:', error.message);
        res.status(500).json({ error: 'Users service no responde' });
    }
});

// PRODUCTS ----------------------------------------

app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('http://product-service:3002/products');
        res.json(response.data);
    } catch (error) {
        console.error('Error en PRODUCTS GET:', error.message);
        res.status(500).json({ error: 'Product service no responde' });
    }
});

app.post('/products', async (req, res) => {
    try {
        const response = await axios.post('http://product-service:3002/products', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error en PRODUCTS POST:', error.message);
        res.status(500).json({ error: 'Product service no responde' });
    }
});

// ORDERS ----------------------------------------

app.get('/orders', async (req, res) => {
    try {
        const response = await axios.get('http://order-service:3003/orders');
        res.json(response.data);
    } catch (error) {
        console.error('Error en ORDERS GET:', error.message);
        res.status(500).json({ error: 'Order service no responde' });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const response = await axios.post('http://order-service:3003/orders', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error en ORDERS POST:', error.message);
        res.status(500).json({ error: 'Order service no responde' });
    }
});

// ROOT ----------------------------------------

app.get('/', (req, res) => {
    res.send('API Gateway funcionando');
});

app.listen(3000, () => {
    console.log('API Gateway en puerto 3000');
});

