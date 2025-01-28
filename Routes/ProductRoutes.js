const express = require('express');
const router = express.Router();

// Dummy data untuk contoh
let products = [
    { id: 1, name: 'Produk A', price: 100 },
    { id: 2, name: 'Produk B', price: 200 },
];

// Endpoint untuk mendapatkan semua produk
router.get('/', (req, res) => {
    res.json(products);
});

// Endpoint untuk menambahkan produk baru
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint untuk mendapatkan produk berdasarkan ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Produk tidak ditemukan.');
    res.json(product);
});

// Endpoint untuk memperbarui produk berdasarkan ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Produk tidak ditemukan.');

    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

// Endpoint untuk menghapus produk berdasarkan ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Produk tidak ditemukan.');

    products.splice(productIndex, 1);
    res.status(204).send(); // No content
});

module.exports = router;
