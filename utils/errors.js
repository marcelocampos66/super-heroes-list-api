const contentNotFoundError = {
  error: {
    type: 'not_found',
    message: 'Content not found.',
  },
};

const invalidIdError = {
  error: {
    type: 'invalid_data',
    message: 'Id not valid.',
  },
};

const userExistsError = {
  error: {
    type: 'invalid_data',
    message: 'User already exists.',
  },
};

const userUnexistsError = {
  error: {
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
