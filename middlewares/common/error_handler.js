const createError = require("http-errors");

/// 404 not found error
function notFoundErrorHandler(req, res, next) {
    // Pass a 404 error to the error handler
    next(createError(404, `${req.url} was not found!`));
}

/// Common Error Handler
function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === "development" ? err : { message: err.message };

    res.status(err.status ?? 500);
    if (res.locals.html) {
        /// Htmml render
        res.render('error', {
            "title": "Error Page",
        })
    } else {
        res.json(res.locals.error)
    }
}

module.exports = {
    notFoundErrorHandler,
    errorHandler,
};
