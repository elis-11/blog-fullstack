export const errorHandler404 = (req, res, next) => {
  const error = new Error("Route does not exist")
  error.status = 404
  next(error) // forward error to central error handler
}

export const errorHandlerGeneric = (err, req, res, next) => {
  // errors of our OWN code we wanna log
  // to the terminal
  // so we can fix them easy :)
  if (!err.status) {
    console.log(err)
  }

  res.status(err.status || 500).json({
    error: err.message || err,
  })
}