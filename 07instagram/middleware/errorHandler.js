module.exports = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = 'You have a pretty error: ' + error.message;
    const data = error.data;
    const validation = error.validation;
    res.status(status).json({
        message,
        data,
        validation
    });
}