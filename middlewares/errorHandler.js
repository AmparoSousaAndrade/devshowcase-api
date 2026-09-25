function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  res.status(status).json({
    error: message,
   ...(err.errors && { details: err.errors })
  });
}
module.exports = errorHandler;