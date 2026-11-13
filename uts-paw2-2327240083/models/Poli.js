const mongoose = require('mongoose');

const poliSchema = new mongoose.Schema({
    kode: { 
        type: String, 
        required: [true, 'Kode poli wajib diisi'], 
        unique: true, 
        uppercase: true 
    },
    nama: { 
        type: String, 
        required: [true, 'Nama poli wajib diisi'] 
    }
});

module.exports = mongoose.model('Poli', poliSchema);