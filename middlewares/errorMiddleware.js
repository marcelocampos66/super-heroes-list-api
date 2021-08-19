module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json({
      error: {
        type: 'invalid_data',
        message: err.details[0].message
      },
    });
  }

  return res.status(500).json({
    error: {
      type: 'internal_server_error',
      message: err.message,
    },
  });
};
