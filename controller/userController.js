function getUser(req,res,next) {
    res.render('users',{
        "title":res.locals.title
    })
}

module.exports={getUser};