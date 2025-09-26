function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({ error: true, message });
}

function notFound(req, res) {
  res.status(404).json({ error: true, message: 'Not Found' });
}

module.exports = { errorHandler, notFound };


