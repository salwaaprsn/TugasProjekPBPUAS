const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(express.json()); // Middleware untuk parsing JSON

// Mengimpor rute
const productRoutes = require('./Routes/ProductRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes');
const userRoutes = require('./Routes/UserRoutes');
const transactionRoutes = require('./Routes/TransactionRoutes');

// Menggunakan rute dengan prefix yang sesuai
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  	res.send('Selamat datang di REST API!');
});

app.listen(port, () => {
  	console.log(`Server berjalan di http://localhost:${port}`);
});
