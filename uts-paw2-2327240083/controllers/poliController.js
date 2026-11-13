const Poli = require('../models/Poli');

exports.createPoli = async (req, res, next) => {
    try {
        const { kode, nama } = req.body;
        const newPoli = new Poli({ kode, nama });
        await newPoli.save();
        res.status(201).json(newPoli);
    } catch (error) {
        next(error);
    }
};

exports.getAllPoli = async (req, res, next) => {
    try {
        const polis = await Poli.find();
        res.status(200).json(polis);
    } catch (error) {
        next(error);
    }
};