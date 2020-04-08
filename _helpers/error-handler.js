module.exports = errorHandler;

function errorHandler(error, request, response, next) {
  if (typeof error === 'string') {
    return response.status(400).json({ status: 400, message: error });
  }

  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ status: 401, message: 'Invalid Token' });
  }

  return response.status(500).json({ status: 500, message: error.message });
}
