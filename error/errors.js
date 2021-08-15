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

const userUnexistsError = {
  err: {
    type: 'invalid_data',
    message: 'User or password incorrect.',
  },
};

module.exports = {
  contentNotFoundError,
  invalidIdError,
  userExistsError,
  userUnexistsError,
};
