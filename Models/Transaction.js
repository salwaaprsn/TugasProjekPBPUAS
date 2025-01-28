const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Mengimpor koneksi ke database
const User = require('./User'); // Mengimpor model User untuk relasi

// Definisikan model untuk transaksi
const Transaction = sequelize.define('Transaction', {
    id_transaksi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_pengguna: {
        type: DataTypes.INTEGER,
        allowNull: false, // ID pengguna tidak boleh kosong
        references: {
            model: User, // Menetapkan relasi dengan model User
            key: 'id_pengguna', // Kunci utama dari tabel pengguna
        },
    },
    total_harga: {
        type: DataTypes.FLOAT,
        allowNull: false, // Total harga tidak boleh kosong
    },
});

// Ekspor model transaksi
module.exports = Transaction;
