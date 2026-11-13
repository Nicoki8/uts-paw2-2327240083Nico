const notFoundHandler = (req, res, next) => {
    const error = new Error(`Rute tidak ditemukan - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Terjadi kesalahan pada server";

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        statusCode = 400;
        message = "Format JSON tidak valid";
        return res.status(statusCode).json({ message });
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = "Format ID tidak valid";
        return res.status(statusCode).json({ message });
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = "Data tidak valid";
        const detail = Object.values(err.errors).map(val => val.message);
        return res.status(statusCode).json({ message, detail });
    }

    if (err.code === 11000) {
        statusCode = 409;
        message = "Data sudah ada (nilai unik bentrok)";
        return res.status(statusCode).json({ message });
    }

    res.status(statusCode).json({ message });
};

module.exports = { notFoundHandler, errorHandler };