const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
    try {
        const token = req.signedCookies[process.env.COOKIE_NAME];

        // If no token found
        if (!token) {
            return handleUnauthorized(req, res);
        }

        // Try verifying token
        const decoded = jwt.verify(token, process.env.JWT_Secret);

        // Store user globally
        req.user = decoded;
        res.locals.loggedInUser = decoded;

        return next();

    } catch (err) {
        // Token invalid or expired
        return handleUnauthorized(req, res);
    }
}

function handleUnauthorized(req, res) {
    const wantsJSON =
        req.xhr ||
        req.headers.accept?.includes("application/json");

    if (wantsJSON) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    // Prevent redirect loop (if already on login page)
    if (req.originalUrl !== "/") {
        return res.redirect("/");
    }

    // If already on login page → just continue
    return res.render("index", {
        title: "Login",
        errors: {},
        data: {}
    });
}

module.exports = checkLogin;
