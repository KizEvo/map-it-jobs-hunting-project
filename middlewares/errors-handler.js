const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  res.status(500).json(err.message)
}

export default errorHandlerMiddleware
