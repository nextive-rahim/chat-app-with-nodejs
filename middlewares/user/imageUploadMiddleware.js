const uploader = require("../../utilites/singleUploaded");

function imageUpload(req, res, next) {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpeg, .jpg, .png files are allowed!"
    );

    upload.single("avatar")(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                errors: {
                    avatar: err.message,
                },
            });
        }
        next();
    });
}

module.exports = imageUpload;
