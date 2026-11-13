require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const poliRoutes = require('./routes/poliRoutes');
const pasienRoutes = require('./routes/pasienRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST']
}));

app.use(express.json());
app.use('/poli', poliRoutes);
app.use('/pasien', pasienRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Koneksi ke MongoDB berhasil');
        // Server baru menerima request setelah koneksi berhasil
        app.listen(process.env.PORT, () => {
            console.log(`Server berjalan di port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Koneksi MongoDB gagal:', err.message);
        process.exit(1); // Hentikan proses jika gagal
    });