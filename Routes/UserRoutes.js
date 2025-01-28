const express = require('express');
const jwt = require('jsonwebtoken'); // Mengimpor jsonwebtoken
const router = express.Router();

// Dummy data untuk contoh
let users = [
    { id_pengguna: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' },
];

// Middleware untuk memverifikasi token JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Mengambil token dari header

    if (!token) {
        return res.sendStatus(401); // Unauthorized jika tidak ada token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden jika token tidak valid
        }
        req.user = user; // Menyimpan informasi pengguna di request
        next(); // Melanjutkan ke middleware berikutnya atau rute
    });
};

// Endpoint untuk mendapatkan semua pengguna (dilindungi)
router.get('/', authMiddleware, (req, res) => {
    res.json(users);
});

// Endpoint untuk menambahkan pengguna baru
router.post('/', (req, res) => {
    const newUser = {
        id_pengguna: users.length + 1,
        username: req.body.username,
        password: req.body.password, // Anda mungkin ingin mengenkripsi password dalam implementasi nyata.
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID (dilindungi)
router.get('/:id', authMiddleware, (req, res) => {
    const user = users.find(u => u.id_pengguna === parseInt(req.params.id));
    if (!user) return res.status(404).send('Pengguna tidak ditemukan.');
    res.json(user);
});

// Endpoint untuk memperbarui pengguna berdasarkan ID (dilindungi)
router.put('/:id', authMiddleware, (req, res) => {
    const user = users.find(u => u.id_pengguna === parseInt(req.params.id));
    if (!user) return res.status(404).send('Pengguna tidak ditemukan.');

    user.username = req.body.username;
    user.password = req.body.password; // Anda mungkin ingin mengenkripsi password dalam implementasi nyata.
    user.email = req.body.email;
    
    res.json(user);
});

// Endpoint untuk menghapus pengguna berdasarkan ID (dilindungi)
router.delete('/:id', authMiddleware, (req, res) => {
    const userIndex = users.findIndex(u => u.id_pengguna === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('Pengguna tidak ditemukan.');

    users.splice(userIndex, 1);
    res.status(204).send(); // No content
});

// Endpoint untuk login dan menghasilkan token JWT
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi kredensial pengguna (ini hanya contoh)
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Kredensial tidak valid' });
    }

    // Buat token JWT
    const token = jwt.sign({ id_pengguna: user.id_pengguna }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token }); // Mengirimkan token ke klien
});

module.exports = router;

