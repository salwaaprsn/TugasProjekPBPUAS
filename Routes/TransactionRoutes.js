const express = require('express');
const router = express.Router();

// Dummy data untuk contoh
let transactions = [
    { id_transaksi: 1, id_pengguna: 1, total_harga: 250.00 },
];

// Endpoint untuk mendapatkan semua transaksi
router.get('/', (req, res) => {
    res.json(transactions);
});

// Endpoint untuk menambahkan transaksi baru
router.post('/', (req, res) => {
    const newTransaction = {
        id_transaksi: transactions.length + 1,
        id_pengguna: req.body.id_pengguna,
        total_harga: req.body.total_harga,
    };
    
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// Endpoint untuk mendapatkan transaksi berdasarkan ID
router.get('/:id', (req, res) => {
    const transaction = transactions.find(t => t.id_transaksi === parseInt(req.params.id));
    if (!transaction) return res.status(404).send('Transaksi tidak ditemukan.');
    
    res.json(transaction);
});

// Endpoint untuk memperbarui transaksi berdasarkan ID
router.put('/:id', (req, res) => {
  	const transaction = transactions.find(t => t.id_transaksi === parseInt(req.params.id));
  	if (!transaction) return res.status(404).send('Transaksi tidak ditemukan.');

  	transaction.id_pengguna = req.body.id_pengguna;
  	transaction.total_harga = req.body.total_harga;

  	res.json(transaction);
});

// Endpoint untuk menghapus transaksi berdasarkan ID
router.delete('/:id', (req, res) => {
  	const transactionIndex = transactions.findIndex(t => t.id_transaksi === parseInt(req.params.id));
  	if (transactionIndex === -1) return res.status(404).send('Transaksi tidak ditemukan.');

  	transactions.splice(transactionIndex, 1);
  	res.status(204).send(); // No content
});

module.exports = router;
