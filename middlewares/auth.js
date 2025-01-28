const jwt = require('jsonwebtoken');

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
