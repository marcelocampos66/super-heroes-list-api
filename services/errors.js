const contentNotFoundError = {
  err: {
    type: 'not_found',
    message: 'Content not found.',
  },
};

const invalidIdError = {
  err: {
    type: 'invalid_data',
    message: 'Id not valid.',
  },
};

const userExistsError = {
  err: {
    type: 'invalid_data',
    message: 'User already exists.',
  },
};

module.exports = {
  contentNotFoundError,
  invalidIdError,
  userExistsError,
};
