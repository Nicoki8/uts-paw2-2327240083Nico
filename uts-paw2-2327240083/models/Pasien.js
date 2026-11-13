const mongoose = require('mongoose');

// Subdocument untuk Embedding tanpa _id
const alamatSchema = new mongoose.Schema({
    jalan: { type: String, required: [true, 'Jalan wajib diisi'] },
    kota: { type: String, required: [true, 'Kota wajib diisi'] }
}, { _id: false });

const pasienSchema = new mongoose.Schema({
    noRekamMedis: { 
        type: String, 
        required: [true, 'No Rekam Medis wajib diisi'], 
        unique: true, 
        trim: true 
    },
    nama: { 
        type: String, 
        required: [true, 'Nama wajib diisi'], 
        trim: true 
    },
    umur: { 
        type: Number, 
        required: [true, 'Umur wajib diisi'], 
        min: [0, 'Umur minimal adalah 0'] 
    },
    golonganDarah: { 
        type: String, 
        required: [true, 'Golongan darah wajib diisi'], 
        trim: true 
    },
    alamat: { 
        type: alamatSchema, 
        required: true 
    },
    poliId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Poli', 
        required: [true, 'Poli ID wajib diisi'] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Pasien', pasienSchema);