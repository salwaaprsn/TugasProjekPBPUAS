const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Mengimpor koneksi ke database

// Definisikan model untuk kategori
const Category = sequelize.define('Category', {
    id_kategori: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_kategori: {
        type: DataTypes.STRING,
        allowNull: false, // Nama kategori tidak boleh kosong
    },
});

// Ekspor model kategori
module.exports = Category;
