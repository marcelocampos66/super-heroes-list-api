const contentNotFoundError = {
  err: {
    type: 'not_found',
    message: 'Content not found',
  },
};

const invalidIdError = {
  err: {
    type: 'invalid_data',
    message: 'Id not valid',
  },
};

module.exports = {
  contentNotFoundError,
  invalidIdError,
};
