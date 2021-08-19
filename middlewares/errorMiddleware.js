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
      message: `Internal server error: ${err.message}`,
    },
  });
};
