const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  res.status(500).json('Something went wrong, ' + err.message)
}

export default errorHandlerMiddleware
