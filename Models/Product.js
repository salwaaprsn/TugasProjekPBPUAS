const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Mengimpor koneksi ke database

// Definisikan model untuk produk
const Product = sequelize.define('Product', {
    id_produk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_produk: {
        type: DataTypes.STRING,
        allowNull: false, // Nama produk tidak boleh kosong
    },
    deskripsi: {
        type: DataTypes.TEXT, // Deskripsi produk dapat berupa teks panjang
        allowNull: true, // Deskripsi bersifat opsional
    },
    harga: {
        type: DataTypes.FLOAT,
        allowNull: false, // Harga produk tidak boleh kosong
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false, // Stok produk tidak boleh kosong
        defaultValue: 0, // Default stok adalah 0
    },
    id_kategori: {
        type: DataTypes.INTEGER,
        allowNull: false, // ID kategori tidak boleh kosong
        references: {
            model: 'Kategori', // Nama tabel kategori di database
            key: 'id_kategori', // Kunci utama dari tabel kategori
        },
    },
});

// Ekspor model produk
module.exports = Product;

