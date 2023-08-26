const notFound = (req, res, next) => {
    next("Your requested page does not exist")
}

const errorHandler =  (err, req, res, next) =>{
    res.status(err.status || 500)
    console.log(err.message, err.stack)
}

module.exports = { errorHandler, notFound }