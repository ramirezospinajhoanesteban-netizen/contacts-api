exports.notFound = (req, res) => {

    res.status(404).json({
        status: 404,
        error: 'Ruta no encontrada'
    });
};

exports.serverError = (err, req, res, next) => {

    res.status(err.status || 500).json({
        status: err.status || 500,
        error: err.message || 'Error interno'
    });
};