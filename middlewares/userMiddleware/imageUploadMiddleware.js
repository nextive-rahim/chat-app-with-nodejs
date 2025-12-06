const uploader=require('../../utilites/singleUploaded')

function imageUpload(req, res, next) {
    const upload = uploader('avatars', ['image/jpeg', 'image/jpg', 'image/png'], 1000000, 'Only .jpeg .png, .jpg allow!');


    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                error: {
                    avatar: err.message
                }
            })
        }
        next();
    })
}
module.exports = imageUpload;