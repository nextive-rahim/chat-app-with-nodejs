function getLogin(req,res,next) {
    res.render('index',{
        "title":res.locals.title
    })
}

module.exports={getLogin};