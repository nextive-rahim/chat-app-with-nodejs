function decorateHtmlRes(page_title) {
    return function (req, res, next) {

        res.locals.html = true;
        res.locals.title = page_title;
        if (!res.locals.loggedInUser) {
            res.locals.loggedInUser = null;
        }
        res.locals.errors = {};
        res.locals.data = {};

        next();
    };
}

module.exports = decorateHtmlRes;
