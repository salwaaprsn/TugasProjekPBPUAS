// Import library yang diperlukan
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Untuk mengakses variabel lingkungan dari .env file

// Import koneksi database dan model
const sequelize = require('./db'); // Koneksi ke database MySQL

// Import rute
const productRoutes = require('./Routes/ProductRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes');
const userRoutes = require('./Routes/UserRoutes');
const transactionRoutes = require('./Routes/TransactionRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengizinkan CORS
app.use(bodyParser.json()); // Parsing JSON request body

// Rute API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Menentukan port untuk server
const PORT = process.env.PORT || 5000;

// Menjalankan server dan sinkronisasi model dengan database
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => console.error("Error syncing with the database:", err));
