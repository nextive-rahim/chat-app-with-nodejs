const jwt = require("jsonwebtoken");

function redirectIfLoggedIn(req, res, next) {
    try {
        const token = req.signedCookies[process.env.COOKIE_NAME];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_Secret);

            // already logged in → go to inbox
            return res.redirect("/inbox");
        }

        next(); // no token → show login page

    } catch (error) {
        next(); // invalid/expired token → show login page
    }
}

module.exports = redirectIfLoggedIn;
