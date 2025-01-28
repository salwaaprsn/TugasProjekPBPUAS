const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Mengimpor koneksi ke database

// Definisikan model untuk pengguna
const User = sequelize.define('User', {
    id_pengguna: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Username harus unik
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Password tidak boleh kosong
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email harus unik
    },
});

// Ekspor model pengguna
module.exports = User;
