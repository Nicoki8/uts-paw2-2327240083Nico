const Pasien = require('../models/Pasien');

exports.createPasien = async (req, res, next) => {
    try {
        // Destructuring membatasi hanya field tabel topik yang diterima
        const { noRekamMedis, nama, umur, golonganDarah, alamat, poliId } = req.body; 
        
        const newPasien = new Pasien({ 
            noRekamMedis, nama, umur, golonganDarah, alamat, poliId 
        });
        
        await newPasien.save();
        res.status(201).json(newPasien);
    } catch (error) {
        next(error);
    }
};

exports.getAllPasien = async (req, res, next) => {
    try {
        const { golonganDarah, sort } = req.query;
        let query = {};
        
        // Filter
        if (golonganDarah) {
            query.golonganDarah = golonganDarah;
        }

        let mongooseQuery = Pasien.find(query);

        // Sorting
        if (sort) {
            mongooseQuery = mongooseQuery.sort({ [sort]: 1 });
        }

        const pasiens = await mongooseQuery;
        res.status(200).json(pasiens);
    } catch (error) {
        next(error);
    }
};

exports.getPasienById = async (req, res, next) => {
    try {
        const pasien = await Pasien.findById(req.params.id).populate('poliId', 'kode nama');
        
        if (!pasien) {
            const error = new Error("Data Pasien tidak ditemukan");
            error.status = 404;
            throw error;
        }
        
        res.status(200).json(pasien);
    } catch (error) {
        next(error);
    }
};