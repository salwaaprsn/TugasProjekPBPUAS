const express = require('express');
const router = express.Router();

// Dummy data untuk contoh
let categories = [
    { id_kategori: 1, nama_kategori: 'Elektronik' },
    { id_kategori: 2, nama_kategori: 'Pakaian' },
];

// Endpoint untuk mendapatkan semua kategori
router.get('/', (req, res) => {
    res.json(categories);
});

// Endpoint untuk menambahkan kategori baru
router.post('/', (req, res) => {
    const newCategory = {
        id_kategori: categories.length + 1,
        nama_kategori: req.body.nama_kategori,
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

// Endpoint untuk mendapatkan kategori berdasarkan ID
router.get('/:id', (req, res) => {
    const category = categories.find(c => c.id_kategori === parseInt(req.params.id));
    if (!category) return res.status(404).send('Kategori tidak ditemukan.');
    res.json(category);
});

// Endpoint untuk memperbarui kategori berdasarkan ID
router.put('/:id', (req, res) => {
    const category = categories.find(c => c.id_kategori === parseInt(req.params.id));
    if (!category) return res.status(404).send('Kategori tidak ditemukan.');

    category.nama_kategori = req.body.nama_kategori;
    res.json(category);
});

// Endpoint untuk menghapus kategori berdasarkan ID
router.delete('/:id', (req, res) => {
    const categoryIndex = categories.findIndex(c => c.id_kategori === parseInt(req.params.id));
    if (categoryIndex === -1) return res.status(404).send('Kategori tidak ditemukan.');

    categories.splice(categoryIndex, 1);
    res.status(204).send(); // No content
});

module.exports = router;
