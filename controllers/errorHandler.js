const errorHandler = (err, req, res, next) => 
{
	err.statusCode = err.statusCode || 400;
	
	if(err.code === 11000)
		err.message = "Duplicate key error. Value you trying to add to DB already exiss"	
	res.status(err.statusCode).json({ status: "fail", message: err.message })
}

module.exports = errorHandler;
